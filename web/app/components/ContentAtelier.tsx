"use client";
import React, { useEffect, useState } from "react";
import { ATELIER_QUERY_RESULT, KeyVal } from "../types/sanity.types";
import { _localizeField, _slugify } from "../sanity-api/utils";
import useLocale from "../context/LocaleContext";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Modal from "./ui/Modal";
import { usePageContext } from "../context/PageContext";
import Link from "next/link";
import Icon from "./ui/Icon";
import BackHome from "./ui/BackHome";
import Slider from "./ui/Slider";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { publish, subscribe, unsubscribe } from "pubsub-js";

type ItemProps = {
  item: KeyVal;
  locale: string;
  zIndex: number;
};

const Item = ({ item, locale, zIndex }: ItemProps) => {
  const { isMobile } = useDeviceDetect();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { modalZIndex: topZIndex, setModalZIndex: setTopZIndex } =
    usePageContext();
  const id = _slugify(item.key?.fr || "");
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

  useEffect(() => {
    const token = subscribe("atelier:modal", (event, data) => {
      if (!isMobile) {
        return;
      }
      if (data !== id) {
        setModalOpen(false);
      }
    });
    return () => {
      unsubscribe(token);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    if (modalOpen) publish("atelier:modal", id);
  }, [modalOpen, isMobile, id]);

  return (
    <div className='item' id={item.key?.fr || ""}>
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

  const [zIndex, setZIndex] = useState<number>(0);
  // const [caption, setCaption] = useState<string>("");
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const caption = images
    ? _localizeField(locale, images[slideIndex]?.caption) || ""
    : "";

  return (
    <div className='content--atelier app-h'>
      <div className='slider'>
        <Slider
          images={images}
          locale={locale}
          onChange={(index) => setSlideIndex(index)}
        />
        <div className='caption '>{caption}</div>
      </div>
      <div className='footer'>
        <div className='grid md:grid-cols-5 md:gap-gutter'>
          {items?.map((item: KeyVal, index: number) => (
            <Item key={index} item={item} locale={locale} zIndex={index} />
          ))}
          {/* <BackHome /> */}
        </div>
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
};

export default ContentAtelier;
