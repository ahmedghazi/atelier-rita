import Figure from "./Figure";
import SvgInline from "../SvgInline";
import { _localizeField } from "../../sanity-api/utils";
import type { LocaleString } from "../../types/sanity.types";

type SliderItemProps = {
  image:
    | {
        asset?: {
          url?: string | null;
          extension?: string | null;
          altText?: unknown;
        } | null;
      }
    | null
    | undefined;
  locale: string;
};

const SliderItem = ({ image, locale }: SliderItemProps) => {
  console.log(image?.asset?.altText);
  const alt =
    _localizeField(locale, image?.asset?.altText as LocaleString | undefined) ||
    "";
  const isSvg =
    /\.svg($|\?)/i.test(image?.asset?.url ?? "") ||
    image?.asset?.extension === "svg";
  return (
    <>
      {!isSvg && <Figure asset={image?.asset} alt={alt} />}
      {isSvg && image?.asset?.url && (
        <SvgInline url={image.asset.url} alt={alt} />
      )}
    </>
  );
};

export default SliderItem;
