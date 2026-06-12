import React from "react";
import website from "@/app/config/website";
import { Metadata, NextPage } from "next";
import { draftMode } from "next/headers";
import ContentProject from "@/app/components/ContentProject";
import { notFound } from "next/navigation";
import { getClient } from "@/app/sanity-api/sanity.client";
import { getProject, PROJECT_QUERY } from "@/app/sanity-api/sanity-queries";
import { PROJECT_QUERY_RESULT } from "@/app/types/sanity.types";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const ProjectPage: NextPage<PageProps> = async ({ params }) => {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  let data: PROJECT_QUERY_RESULT;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PROJECT_QUERY,
      { slug },
    );
  } else {
    data = await getProject(slug);
  }

  if (!data) return notFound();

  return (
    <div className='template template--project' data-template='project'>
      <ContentProject input={data} />
    </div>
  );
};

export default ProjectPage;
