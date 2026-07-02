import website from "@/app/config/website";
import { urlFor } from "@/app/sanity-api/sanity-utils";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { SanityImageAsset } from "sanity-codegen";

type Props = {
  asset: SanityImageAsset | any;
  title?: string;
  width?: number;
  alt?: string | any;
};

const Figure = ({ asset, width = 1000, alt = website.title, title }: Props) => {
  return (
    <figure
      className={clsx(
        "figure",
        asset?.metadata?.dimensions?.aspectRatio > 1
          ? "is-landscape"
          : "is-portrait",
      )}>
      <Image
        src={urlFor(asset, width)}
        width={asset?.metadata?.dimensions.width || width}
        height={asset?.metadata?.dimensions.height || width}
        alt={alt || ""}
        sizes='100vw'
        // style={{
        //   width: "100%",
        //   height: "auto",
        //   aspectRatio: `${asset?.metadata?.dimensions.width} / ${asset?.metadata?.dimensions.height}`,
        //   // objectFit: "cover",
        // }}
        blurDataURL={asset?.metadata?.lqip}
        // placeholder='blur'
        placeholder={asset?.metadata?.lqip}
      />
      {title && <figcaption className='sm-only'>{title}</figcaption>}
    </figure>
  );
};

export default Figure;
