import { sanityFetch } from "./sanity.client";
import { image, projectCard, seo } from "./fragments";
import { defineQuery } from "next-sanity";
import type {
  SETTINGS_QUERY_RESULT,
  HOME_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  ATELIER_QUERY_RESULT,
} from "../types/sanity.types";

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  ...,
  navPrimary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        _type,
        slug
      }
    }
  },
}`);

export async function getSettings(): Promise<SETTINGS_QUERY_RESULT> {
  return sanityFetch({
    query: SETTINGS_QUERY,
    tags: ["settings"],
  });
}

/**
 * HOME
 *
 */
export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  ...,
  seo{
    ${seo}
  },
  projects[]->{
    ${projectCard}
  },
  news[]{
    ...
  }
}`);

export async function getHome(): Promise<HOME_QUERY_RESULT> {
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["home"],
  });
}

/**
 * PROJECT_QUERY
 *
 */
export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ...,
    seo{
      ${seo}
    },
    imageCover{
      ${image}
    },
    images[]{
      ${image}
    },
    fiche_technique[]{
      ...
    },
    related->{
      _type,
      slug,
      imageCover{
        ${image}
      }
    }
  }
`);

export async function getProject(slug: string): Promise<PROJECT_QUERY_RESULT> {
  return sanityFetch({
    query: PROJECT_QUERY,
    qParams: { slug },
    tags: ["project", `project:${slug}`],
  });
}

/**
 * PROJECTS
 *
 */
export const PROJECTS_QUERY = defineQuery(`*[_type == "projects"][0]{
  ...,
  seo{
    ${seo}
  },
  items[]->{
    ${projectCard}
  }
}`);

export async function getProjects(): Promise<PROJECTS_QUERY_RESULT> {
  return sanityFetch({
    query: PROJECTS_QUERY,
    tags: ["projects"],
  });
}

/**
 * ATELIER
 *
 */
export const ATELIER_QUERY = defineQuery(`*[_type == "atelier"][0]{
  ...,
  seo{
    ${seo}
  },
  images[]{
    ${image}
  },
  items[]{
    ...
  }
}`);

export async function getAtelier(): Promise<ATELIER_QUERY_RESULT> {
  return sanityFetch({
    query: ATELIER_QUERY,
    tags: ["atelier"],
  });
}

/**
 * PAGE
 *
 */
// export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
//   ...,
//   seo{
//     ${seo}
//   }
// }`;

// export async function getPage(slug: string): Promise<Page> {
//   return sanityFetch({
//     query: PAGE_QUERY,
//     tags: ["page"],
//     qParams: { slug: slug },
//   });
// }
