import website from "../config/website";
import {
  getAllProjects,
  getAtelier,
  getHome,
  getProjects,
} from "../sanity-api/sanity-queries";
import { _linkResolver } from "../sanity-api/utils";

export const dynamic = "force-static";

const line = (title: string, path: string, description?: string | null) =>
  `- [${title}](${website.url}${path})${
    description ? `: ${description}` : ""
  }\n`;

export async function GET() {
  const [home, projectsPage, atelier, projects] = await Promise.all([
    getHome(),
    getProjects(),
    getAtelier(),
    getAllProjects(),
  ]);

  let content = `# ${website.title}\n\n## Pages\n\n`;
  content += line(
    home?.seo?.metaTitle || "Accueil",
    "/",
    home?.seo?.metaDescription
  );
  content += line(
    projectsPage?.seo?.metaTitle || "Projets",
    "/projects",
    projectsPage?.seo?.metaDescription
  );
  content += line(
    atelier?.seo?.metaTitle || "Info",
    "/atelier",
    atelier?.seo?.metaDescription
  );

  content += `\n## Projets\n\n`;

  projects.forEach((project) => {
    content += line(
      project.seo?.metaTitle || project.title?.fr || "",
      _linkResolver(project),
      project.seo?.metaDescription
    );
  });

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
