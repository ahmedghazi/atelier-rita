import Figure from "../Figure";
import SvgInline from "../../SvgInline";
import { _localizeField } from "../../../sanity-api/utils";
import type {
  LocaleString,
  SanityImageCrop,
  SanityImageHotspot,
} from "../../../types/sanity.types";

export type SliderImage =
  | {
      asset?: {
        url?: string | null;
        extension?: string | null;
      } | null;
      hotspot?: SanityImageHotspot | null;
      crop?: SanityImageCrop | null;
      alt?: unknown;
      caption?: unknown;
    }
  | null
  | undefined;

type SliderItemProps = {
  image: SliderImage;
  locale: string;
};

const SliderItem = ({ image, locale }: SliderItemProps) => {
  const alt =
    _localizeField(locale, image?.caption as LocaleString | undefined) || "";
  const isSvg =
    /\.svg($|\?)/i.test(image?.asset?.url ?? "") ||
    image?.asset?.extension === "svg";
  return (
    <>
      {!isSvg && <Figure image={image} alt={alt} />}
      {isSvg && image?.asset?.url && (
        <SvgInline url={image.asset.url} alt={alt} />
      )}
    </>
  );
};

export default SliderItem;
