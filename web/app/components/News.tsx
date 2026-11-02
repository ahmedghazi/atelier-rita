"use client";
import React, { useEffect, useState } from "react";
import { News } from "../types/sanity.types";
import Modal from "./ui/Modal";
import { PortableText } from "next-sanity";
import { _date, _localizeField } from "../sanity-api/utils";
import portableTextComponents from "../sanity-api/portableTextComponents";
import useLocale from "../context/LocaleContext";

type Props = {
  news: News;
};

const NewsComponent = ({ news }: Props) => {
  const { locale } = useLocale();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setModalOpen(true);
    }, 500);
  }, []);

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)} bigClose>
      <div className='news-item text-display-lg--sm- md:text-display-lg- text-display-lg'>
        <div className='title'>
          {_localizeField(locale, news?.title) as string}
        </div>
        {news?.date && <div className='date'>{_date(news.date)}</div>}
        <div className='text'>
          <PortableText
            value={_localizeField(locale, news.text) as string}
            components={portableTextComponents}
          />
        </div>
        {news?.link && (
          <a href={news?.link?.link} target='_blank' rel='noopener noreferrer'>
            {news?.link?.label}
          </a>
        )}
      </div>
    </Modal>
  );
};

export default NewsComponent;
