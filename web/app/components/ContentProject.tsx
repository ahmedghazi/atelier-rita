"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PROJECT_QUERY_RESULT } from "../types/sanity.types";
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

type Props = {
  input: NonNullable<PROJECT_QUERY_RESULT>;
};

const ContentProject = ({ input }: Props) => {
  const { locale } = useLocale();
  const { imageCover, images, title, city, zip, year, text, metas, related } =
    input;
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

  return (
    <div
      className={clsx(
        "content content--project app-h",
        sliderEnded && "slider-ended",
      )}>
      <div className='slider'>
        <div className='flex'>
          <KeenSlider loop={false}>
            {slides.map((image, index: number) => (
              <div key={index + 1} className='keen-slider__slide'>
                <Figure asset={image?.asset} alt={image?.asset?.altText} />
              </div>
            ))}
          </KeenSlider>

          {related && (
            <div className='related'>
              <h2 className='text-lg'>
                {_localizeText(locale, "nextProject")}
              </h2>
              <div className='image-cover'>
                <Link href={_linkResolver(related)}>
                  <Figure
                    asset={related?.imageCover?.asset}
                    alt={related?.slug?.current}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className='caption '>{caption}</div>
      </div>
      <div className='footer'>
        <h1 className='title col-span-2 text-lg'>
          {_localizeField(locale, title)}, <span className='city'>{city}</span>{" "}
          <span className='zip'>{zip}</span>
        </h1>
        <button className='toggle ' onClick={() => setModalOpen(!modalOpen)}>
          {_localizeText(locale, "text")}
        </button>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='project-infos'>
          <div className='header'>
            <h1 className='title'>
              {_localizeField(locale, title)},{" "}
              <span className='city'>{city}</span>
              <span className='zip'>{zip}</span>
            </h1>
            <div className='year'>{year}</div>
          </div>
          <div className='text'>
            <PortableText
              value={_localizeField(locale, text)}
              components={portableTextComponents}
            />
          </div>
          <ul className='fiche-technique'>
            {metas?.map((item, i) => (
              <li key={item._key}>
                <div className='key'>{_localizeField(locale, item.key)}</div>
                <div className='value'>
                  <PortableText
                    value={_localizeField(locale, item.value)}
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
