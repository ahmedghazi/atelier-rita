"use client";
import React, { useEffect, useState } from "react";
import { ATELIER_QUERY_RESULT, KeyVal } from "../types/sanity.types";
import { _localizeField } from "../sanity-api/utils";
import { subscribe, unsubscribe } from "pubsub-js";
import useLocale from "../context/LocaleContext";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Modal from "./ui/Modal";
import KeenSlider from "./ui/KeenSlider";
import { usePageContext } from "../context/PageContext";
import SliderItem from "./ui/SliderItem";
import Link from "next/link";
import Icon from "./ui/Icon";
import BackHome from "./ui/BackHome";

type ItemProps = {
  item: KeyVal;
  locale: string;
  zIndex: number;
};

const Item = ({ item, locale, zIndex }: ItemProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { modalZIndex: topZIndex, setModalZIndex: setTopZIndex } =
    usePageContext();
  const [modalZIndex, setLocalZIndex] = useState<number>(
    () => topZIndex + zIndex,
  );

  const handleClick = () => {
    if (!modalOpen) {
      const next = topZIndex + 1;
      setTopZIndex(next);
      setLocalZIndex(next);
    }
    setModalOpen(!modalOpen);
  };

  return (
    <div className='item'>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        zIndex={modalZIndex}>
        <div className='text'>
          <PortableText
            value={_localizeField(locale, item.value)}
            components={portableTextComponents}
          />
        </div>
      </Modal>
      <button onClick={handleClick}>
        {_localizeField(locale, item.key) as string}
      </button>
    </div>
  );
};

type Props = {
  input: NonNullable<ATELIER_QUERY_RESULT>;
};

const ContentAtelier = ({ input }: Props) => {
  const { items, images } = input;
  const { locale } = useLocale();
  // const _images = [
  //   "https://picsum.photos/200/300",
  //   "https://picsum.photos/220/330",
  //   "https://picsum.photos/400/300",
  // ];
  const [zIndex, setZIndex] = useState<number>(0);
  const [caption, setCaption] = useState<string>("");

  useEffect(() => {
    const token = subscribe("SLIDER_CHANGED", (e, d) => {
      setCaption(images?.[d]?.asset?.title || "");
    });
    return () => {
      unsubscribe(token);
    };
  }, [images]);

  return (
    <div className='content--atelier app-h'>
      <div className='slider'>
        <KeenSlider>
          {images?.map((image, index: number) => (
            <div key={index + 1} className='keen-slider__slide'>
              <SliderItem image={image} locale={locale} />
              {/* <img src={image} alt='' srcset='' /> */}
            </div>
          ))}
        </KeenSlider>
        <div className='caption '>{caption}</div>
      </div>
      <div className='footer'>
        <div className='grid md:grid-cols-5 md:gap-gutter'>
          {items?.map((item: KeyVal, index: number) => (
            <Item key={index} item={item} locale={locale} zIndex={index} />
          ))}
          <BackHome />
        </div>
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
};

export default ContentAtelier;
