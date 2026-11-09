import { createImageUrlBuilder } from "@sanity/image-url";
// import { definePreview } from 'next-sanity/preview'
import { sanityConfig } from "./sanity.client";
import { SanityImageAsset } from "sanity-codegen";
import { SanityImageCrop, SanityImageHotspot } from "../types/sanity.types";
// import { SanityAsset } from "@sanity/image-url/lib/types/types";

const imageBuilder = createImageUrlBuilder(sanityConfig);

// type SanityImage = {
//   _type: "image";
//   assetId: string;
//   asset: SanityImageAsset;
//   crop?: SanityImageCrop;
//   hotspot?: SanityImageHotspot;
// };

export function urlFor(source: SanityImageAsset, maxWidth: number = 2000): any {
  // console.log(source.assetId);
  if (!source) {
    return "/placeholder.png";
  }
  // console.log("here after test");
  //7cbf348a36c255502fdd8b4d2ae93c902e2c2ba8-900x400.png?rect=215,0,378,400&w=2000&fit=max&auto=format&dpr=2
  // if (source.crop) {
  //   // console.log(source);

  //   const crop = source.crop;
  //   const { width, height } = source.asset.metadata?.dimensions;
  //   const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

  //   const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

  //   // compute the cropped image's position
  //   const left = Math.floor(width * crop.left);
  //   const top = Math.floor(height * crop.top);
  //   // gather into a url
  //   return imageBuilder
  //     ?.image(source.asset)
  //     .rect(left, top, croppedWidth, croppedHeight)
  //     .url();
  // }
  // console.log(source);
  return (
    imageBuilder
      ?.image(source)
      .width(maxWidth)
      // .format("webp")
      .auto("format")
      .fit("max")
      .dpr(2)
      .url()
  );
}

// srcset entries come straight from the Sanity CDN at the requested width
export const sanityLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  if (!src.startsWith("https://cdn.sanity.io")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 75));
  url.searchParams.delete("dpr");
  return url.toString();
};

// hotspot is relative to the full image, object-position needs it relative to the cropped one
export const sanityHotspot = (
  hotspot?: SanityImageHotspot | null,
  crop?: SanityImageCrop | null,
) => {
  if (hotspot?.x == null || hotspot?.y == null) return undefined;
  const { top = 0, bottom = 0, left = 0, right = 0 } = crop ?? {};
  const x = (hotspot.x - left) / (1 - left - right);
  const y = (hotspot.y - top) / (1 - top - bottom);
  return `${x * 100}% ${y * 100}%`;
};

// export const usePreview = definePreview({
//   projectId: sanityConfig.projectId,
//   dataset: sanityConfig.dataset,
// })
