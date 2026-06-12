# www

## Sanity + Next.js TypeGen setup

This repo pairs a standalone Sanity Studio (`studio/`) with the Next.js app (`web/`). Query types
are generated from the Studio's schema and consumed by the app.

### One-time setup (for new projects)

1. **Standalone Studio** — create the Studio as its own app (not embedded in Next.js):
   ```bash
   npm create sanity@latest -- --project <projectId> --dataset production --template clean --typescript --output-path studio
   ```

2. **Configure TypeGen in `studio/sanity.cli.ts`**:
   ```ts
   import { defineCliConfig } from "sanity/cli";

   export default defineCliConfig({
     api: { projectId: "<projectId>", dataset: "production" },
     schemaExtraction: { enabled: true },
     typegen: {
       path: "../web/app/**/*.{ts,tsx}", // where to scan for defineQuery(...)
       schema: "../web/schema.json", // extracted schema output
       generates: "../web/app/types/sanity.types.ts", // generated types output
     },
   });
   ```

3. **Add root scripts** (`package.json` at repo root):
   ```json
   {
     "scripts": {
       "sanity:schema": "cd studio && pnpm exec sanity schema extract --path ../web/schema.json",
       "sanity:typegen": "cd studio && pnpm exec sanity typegen generate",
       "sanity:types": "npm run sanity:schema && npm run sanity:typegen"
     }
   }
   ```

### Writing queries (`web/app/sanity-api/sanity-queries.tsx`)

Wrap every GROQ query in `defineQuery` and export it:

```ts
import { defineQuery } from "next-sanity";

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ...,
    seo{ ... }
  }
`);
```

After running TypeGen, a matching `<NAME>_RESULT` type is generated in
`web/app/types/sanity.types.ts`. Use it as the return type of your fetcher instead of a
hand-written/schema type:

```ts
import type { PROJECT_QUERY_RESULT } from "../types/sanity.types";

export async function getProject(slug: string): Promise<PROJECT_QUERY_RESULT> {
  return sanityFetch({
    query: PROJECT_QUERY,
    qParams: { slug },
    tags: ["project", `project:${slug}`],
  });
}
```

This also gives correctly-typed resolved references (e.g. `asset->` projections include `url`),
so no manual casts are needed.

### Day-to-day workflow

Run from the repo root after **any** change to either the Studio schema or a `defineQuery` in `web/`:

```bash
pnpm run sanity:types
```

- Changed a schema field? → regenerates `web/schema.json` and the result types.
- Changed/added a query? → regenerates the result types from the existing schema.

It's a single pipeline (the script `cd`s into `studio/` for both steps but writes output into
`web/app/types/sanity.types.ts`) — no need to run anything separately per package.

### Draft mode

Keep the two-branch fetch pattern per page:

```ts
const { isEnabled } = await draftMode();
let data: PROJECT_QUERY_RESULT;
if (isEnabled) {
  data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(PROJECT_QUERY, { slug });
} else {
  data = await getProject(slug);
}
```

Both branches return the same generated `*_QUERY_RESULT` type, so no extra typing is needed for
the preview path.
