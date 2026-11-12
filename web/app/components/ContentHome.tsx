"use client";
import React, { useEffect, useState, startTransition } from "react";
import { HOME_QUERY_RESULT } from "../types/sanity.types";
import { useRandomItem } from "../hooks/useRandomItem";
import { PortableText } from "next-sanity";
import { _date, _localizeField } from "../sanity-api/utils";
import portableTextComponents from "../sanity-api/portableTextComponents";
import useLocale from "../context/LocaleContext";
import Modal from "./ui/Modal";
import CardHomeComponent from "./CardHome";
import NewsComponent from "./News";

type Props = {
  input: NonNullable<HOME_QUERY_RESULT>;
};

type Item = NonNullable<NonNullable<HOME_QUERY_RESULT>["items"]>[number];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const mergeSvgsIntoImgs = (imgs: Item[], svgs: Item[]): Item[] => {
  const shuffledImgs = shuffle(imgs);
  const shuffledSvgs = shuffle(svgs);
  const N = shuffledImgs.length;
  // N+1 slots exist (before, between, and after each img); cap SVGs to avoid adjacency
  const M = Math.min(shuffledSvgs.length, N + 1);
  const slots = shuffle([...Array(N + 1).keys()])
    .slice(0, M)
    .sort((a, b) => a - b);

  const result: Item[] = [];
  let svgIdx = 0;
  let slotIdx = 0;

  for (let i = 0; i <= N; i++) {
    if (slotIdx < slots.length && slots[slotIdx] === i) {
      result.push(shuffledSvgs[svgIdx++]);
      slotIdx++;
    }
    if (i < N) result.push(shuffledImgs[i]);
  }

  return result;
};

const ContentHome = ({ input }: Props) => {
  const { locale } = useLocale();
  const { items, news } = input;
  const randomNews = useRandomItem(news) ?? "";
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [finalArr, setFinalArr] = useState<Item[]>([]);

  useEffect(() => {
    if (!items) return;
    const isSvgItem = (item: Item | null) =>
      /\.svg($|\?)/i.test(item?.image?.asset?.url ?? "") ||
      item?.image?.asset?.extension === "svg";
    const arrImgs = items.filter((item) => !isSvgItem(item)) as Item[];
    const arrSvgs = items.filter((item) => isSvgItem(item)) as Item[];
    startTransition(() => {
      setFinalArr(mergeSvgsIntoImgs(arrImgs, arrSvgs));
    });
  }, [items]);

  return (
    <div className='content--home '>
      {news?.map((newsItem, index) => (
        <NewsComponent key={index} news={newsItem} />
      ))}
      <div
        className='grid grid-cols-2 md:grid-cols-5 gap-xs md:gap-gutter md:gap-y-header-h'
        style={{}}>
        {finalArr.map((item, index) => (
          <CardHomeComponent input={item} key={index} />
        ))}
      </div>
      <div className='credits'>
        <p>
          Production{" "}
          <a href='www.aha-paris.com' rel='noreferrer noopener' target='_blank'>
            AHA
          </a>
          <br />
          Design{" "}
          <a
            href='http://jbparre.com/'
            rel='noreferrer noopener'
            target='_blank'>
            Jean-Baptiste Parré
          </a>
          <br />
          Code{" "}
          <a
            href='https://ahmedghazi.com/'
            rel='noreferrer noopener'
            target='_blank'>
            Ahmed Ghazi
          </a>
          <br />
          Illustration carte Rita{" "}
          <a
            href='https://www.instagram.com/zoe.bourhis/'
            rel='noreferrer noopener'
            target='_blank'>
            Zoé Bourhis
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContentHome;
