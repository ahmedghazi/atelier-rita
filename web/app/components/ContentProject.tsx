"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Project, PROJECT_QUERY_RESULT } from "../types/sanity.types";
import Figure from "./ui/Figure";
import {
  _linkResolver,
  _localizeField,
  _localizeText,
} from "../sanity-api/utils";
import KeenSlider from "./ui/KeenSlider";
import { subscribe, unsubscribe } from "pubsub-js";
import useLocale from "../context/LocaleContext";
import portableTextComponents from "../sanity-api/portableTextComponents";
import { PortableText } from "next-sanity";
import Modal from "./ui/Modal";
import clsx from "clsx";
import Link from "next/link";
import CityAndZip from "./CityAndZip";
import BackHome from "./ui/BackHome";
import SlickSlider from "./ui/SlickSlider";
import SvgInline from "./SvgInline";

type ContentProjectSlideProps = {
  image: NonNullable<PROJECT_QUERY_RESULT>["imageCover"];
  index: number;
  alt: string;
};

const ContentProjectSlide = ({
  image,
  index,
  alt = "",
}: ContentProjectSlideProps) => {
  const isSvg =
    /\.svg($|\?)/i.test(image?.asset?.url ?? "") ||
    image?.asset?.extension === "svg";
  return (
    <div key={index + 1} className='ss-slider__slide'>
      {/* <Figure
        asset={image?.asset}
        alt={image?.asset?.altText}
        title={image?.asset?.title || undefined}
      /> */}
      {!isSvg && <Figure asset={image?.asset} alt={alt} />}
      {isSvg && image?.asset?.url && (
        <SvgInline url={image.asset.url} alt={alt} />
      )}
    </div>
  );
};

type Props = {
  input: NonNullable<PROJECT_QUERY_RESULT>;
  relatedByindex: Project;
};

const ContentProject = ({ input, relatedByindex }: Props) => {
  const { locale } = useLocale();
  const {
    imageCover,
    images,
    title,
    type,
    programme,
    city,
    zip,
    client,
    team,
    year,
    numbers,
    text,
    metas,
    related,
  } = input;
  const [caption, setCaption] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sliderEnded, setSliderEnded] = useState<boolean>(false);
  const slides = useMemo(() => {
    return [imageCover, ...(images || [])];
  }, [imageCover, images]);

  useEffect(() => {
    const token = subscribe("SLIDER_CHANGED", (e, d) => {
      setCaption(slides[d]?.asset?.title || "");
    });
    const tokenEnded = subscribe("SLIDER_ENDED", (e, d) => {
      console.log("Slider ended", d);
      setSliderEnded(d);
    });
    return () => {
      unsubscribe(token);
      unsubscribe(tokenEnded);
    };
  }, [slides]);

  const ficheTechnique = [
    {
      key: _localizeText(locale, "type"),
      value: _localizeField(locale, type),
    },
    {
      key: _localizeText(locale, "programme"),
      value: _localizeField(locale, programme),
    },
    {
      key: _localizeText(locale, "client"),
      value: client,
    },
    {
      key: _localizeText(locale, "team"),
      value: team,
    },
    {
      key: _localizeText(locale, "city"),
      value: city,
    },
    {
      key: _localizeText(locale, "numbers"),
      value: numbers,
    },
    // {
    //   key: _localizeText(locale, "year"),
    //   value: year,
    // },
  ];

  const _related = related ? related : relatedByindex;
  return (
    <div
      className={clsx(
        "content content--project app-h",
        sliderEnded && "slider-ended",
      )}>
      <div className='slider'>
        <div className='flex--'>
          <SlickSlider
            controlsFloating={true}
            settings={{
              infinite: false,
            }}>
            {slides.map((image, index: number) => (
              <ContentProjectSlide
                key={index + 1}
                image={image}
                index={index}
                alt={image?.asset?.altText || ""}
              />
            ))}
          </SlickSlider>

          {_related && (
            <div className='related'>
              <Link href={_linkResolver(_related)}>
                <h2 className='text-display-lg--sm md:text-display-lg'>
                  {_localizeText(locale, "nextProject")}
                </h2>

                <div className='image-cover'>
                  <Figure
                    asset={_related?.imageCover?.asset}
                    alt={_related?.slug?.current}
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className='caption hidden-sm'>{caption}</div>
      </div>
      <div className='footer'>
        {/* <pre>{JSON.stringify(relatedByindex, null, 2)}</pre> */}
        <div className='grid md:grid-cols-5 gap-gutter items-baseline'>
          <h1 className='title col-span-4 md:col-span-3 text-display-lg--sm md:text-display-lg'>
            <div>{_localizeField(locale, title) as string},</div>
            {/* <span>, </span> */}
            <CityAndZip city={city} zip={zip} />
          </h1>
          <button className='toggle ' onClick={() => setModalOpen(!modalOpen)}>
            {_localizeText(locale, "text")}
          </button>
          <BackHome />
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='project-infos'>
          <div className='header'>
            <div className='title'>
              {_localizeField(locale, title) as string}
              <span>, </span>
              <CityAndZip city={city} zip={zip} />
            </div>
            <div className='year'>{year}</div>
          </div>
          <div className='text'>
            <PortableText
              value={_localizeField(locale, text)}
              components={portableTextComponents}
            />
          </div>
          <ul className='fiche-technique'>
            {ficheTechnique.map((item, i) => (
              <li key={i}>
                {item.value && (
                  <>
                    <div className='key'>{item.key}</div>
                    <div className='value'>{item.value as string}</div>
                  </>
                )}
              </li>
            ))}

            {metas?.map((item, i) => (
              <li key={item._key}>
                <div className='key'>
                  {_localizeField(locale, item.key) as string}
                </div>
                <div className='value'>
                  <PortableText
                    value={_localizeField(locale, item.value) as string}
                    components={portableTextComponents}
                  />
                  {/* {_localizeField(locale, item.value)} */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ContentProject;
