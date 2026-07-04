"use client";
import React, { useEffect, useState, startTransition } from "react";
import { HOME_QUERY_RESULT } from "../types/sanity.types";
import { useRandomItem } from "../hooks/useRandomItem";
import { PortableText } from "next-sanity";
import { _localizeField } from "../sanity-api/utils";
import portableTextComponents from "../sanity-api/portableTextComponents";
import useLocale from "../context/LocaleContext";
import Modal from "./ui/Modal";
import CardHomeComponent from "./CardHome";

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
  const slots = shuffle([...Array(N + 1).keys()]).slice(0, M).sort((a, b) => a - b);

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
    const arrImgs = items.filter(
      (item) => item?.image?.asset?.extension !== "svg",
    ) as Item[];
    const arrSvgs = items.filter(
      (item) => item?.image?.asset?.extension === "svg",
    ) as Item[];
    startTransition(() => {
      setFinalArr(mergeSvgsIntoImgs(arrImgs, arrSvgs));
    });
  }, [items]);

  useEffect(() => {
    if (randomNews) {
      setTimeout(() => {
        setModalOpen(true);
      }, 500);
    }
  }, [randomNews]);

  return (
    <div className='content--home '>
      {randomNews && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} bigClose>
          <div className='news-item text-display-lg--sm- md:text-display-lg- text-display-lg'>
            <div className='title'>
              {_localizeField(locale, randomNews?.title) as string}
            </div>
            <div className='text'>
              <PortableText
                value={_localizeField(locale, randomNews.text) as string}
                components={portableTextComponents}
              />
            </div>
            {randomNews?.link && (
              <a
                href={randomNews?.link?.link}
                target='_blank'
                rel='noopener noreferrer'>
                {randomNews?.link?.label}
              </a>
            )}
          </div>
        </Modal>
      )}
      <div
        className='grid grid-cols-2 md:grid-cols-5 gap-xs md:gap-gutter md:gap-y-header-h'
        style={{}}>
        {finalArr.map((item, index) => (
          <CardHomeComponent input={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ContentHome;
