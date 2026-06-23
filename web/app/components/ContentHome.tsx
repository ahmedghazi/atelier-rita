"use client";
import React, { useEffect, useState } from "react";
import { HOME_QUERY_RESULT, News, Project } from "../types/sanity.types";
import CardProject from "./CardProject";
import { useRandomItem } from "../hooks/useRandomItem";
import { PortableText } from "next-sanity";
import { _localizeField } from "../sanity-api/utils";
import portableTextComponents from "../sanity-api/portableTextComponents";
import useLocale from "../context/LocaleContext";
import Modal from "./ui/Modal";

type Props = {
  input: NonNullable<HOME_QUERY_RESULT>;
};

const ContentHome = ({ input }: Props) => {
  const { locale } = useLocale();
  const { projects, news } = input;
  const randomNews = useRandomItem(news) ?? "";
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (randomNews) {
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    }
  }, [randomNews]);

  return (
    <div className='content--home '>
      {/* <pre>{JSON.stringify(randomNews, null, 2)}</pre> */}

      {randomNews && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} bigClose>
          <div className='news-item text-lg--sm md:text-lg'>
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
      <div className='grid md:grid-cols-5 gap-gutter' style={{}}>
        {projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
        {projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
        {projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
        {projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ContentHome;
