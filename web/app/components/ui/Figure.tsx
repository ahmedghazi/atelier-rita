"use client";
import website from "@/app/config/website";
import { sanityHotspot, sanityLoader, urlFor } from "@/app/sanity-api/sanity-utils";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { SanityImageAsset } from "sanity-codegen";
import { SanityImageCrop, SanityImageHotspot } from "@/app/types/sanity.types";

type Props = {
  image:
    | {
        asset?: SanityImageAsset | any;
        hotspot?: SanityImageHotspot | null;
        crop?: SanityImageCrop | null;
      }
    | null
    | undefined;
  title?: string;
  width?: number;
  sizes?: string;
  alt?: string | any;
  caption?: string | any;
};

const Figure = ({
  image,
  width = 1000,
  sizes = "100vw",
  alt = website.title,
  caption,
}: Props) => {
  const { asset, hotspot, crop } = image ?? {};
  const dimensions = asset?.metadata?.dimensions;
  const { top = 0, bottom = 0, left = 0, right = 0 } = crop ?? {};
  const imgWidth = dimensions?.width
    ? Math.round(dimensions.width * (1 - left - right))
    : width;
  const imgHeight = dimensions?.height
    ? Math.round(dimensions.height * (1 - top - bottom))
    : width;
  // passing crop to the builder makes it return the cropped rect
  const src = urlFor(asset && (image as any), width);
  const objectPosition = sanityHotspot(hotspot, crop);

  return (
    <figure
      className={clsx(
        "figure",
        imgWidth / imgHeight > 1 ? "is-landscape" : "is-portrait",
      )}
      // consumed by object-fit: cover rules, see _card.scss
      style={
        objectPosition
          ? ({ "--object-position": objectPosition } as React.CSSProperties)
          : undefined
      }>
      <Image
        loader={sanityLoader}
        src={src}
        width={imgWidth}
        height={imgHeight}
        alt={alt || ""}
        sizes={sizes}
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
      {caption && <figcaption className='sm-only'>{caption}</figcaption>}
    </figure>
  );
};

export default Figure;
