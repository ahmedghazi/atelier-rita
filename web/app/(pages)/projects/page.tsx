// import ContentInfos from "@/app/components/ContentInfos";
import ContentAtelier from "@/app/components/ContentAtelier";
import ContentProjects from "@/app/components/ContentProjects";
import website from "@/app/config/website";
import {
  ATELIER_QUERY,
  getAtelier,
  getProjects,
  PROJECTS_QUERY,
} from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import {
  ATELIER_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "@/app/types/sanity.types";
// import { Infos } from "@/app/types/schema";
// import { Infos, Page } from "@/app/types/schema";
// import { getClient } from "@/app/utils/sanity-client";
// import { getInfos, infosQuery } from "@/app/utils/sanity-queries";
// import { _localizeField } from "@/app/utils/utils";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProjects();
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

const InfosPage = async function Page({ params }: PageProps) {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  let data: PROJECTS_QUERY_RESULT;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PROJECTS_QUERY,
      { slug },
    );
  } else {
    data = await getProjects();
  }

  if (!data) return notFound();
  return (
    <div className='template template--projects' data-template='projects'>
      <ContentProjects input={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default InfosPage;
