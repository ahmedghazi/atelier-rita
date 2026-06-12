import { draftMode } from "next/headers";
import { getClient } from "./sanity-api/sanity.client";
import ContentHome from "./components/ContentHome";
import { Metadata } from "next";
import website from "./config/website";
import { getHome, HOME_QUERY } from "./sanity-api/sanity-queries";
import { HOME_QUERY_RESULT } from "./types/sanity.types";

export const revalidate = 3600; // revalidate every hour

// type PageProps = {
//   params: {
//     slug: string;
//   };
// };

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || website.title}`,
    description: data?.seo?.metaDescription || website.description,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const HomePage = async function Page() {
  const { isEnabled } = await draftMode();
  let data: HOME_QUERY_RESULT;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      HOME_QUERY,
    );
  } else {
    data = await getHome();
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--home' data-template='home'>
      <ContentHome input={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default HomePage;
