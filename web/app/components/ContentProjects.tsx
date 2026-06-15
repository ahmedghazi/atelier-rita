"use client";
import React from "react";
import {
  Project,
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "../types/sanity.types";
import CardProjectTxt, { ProjectImageCoverAsset } from "./CardProjectTxt";
import Figure from "./ui/Figure";
import { _localizeText } from "../sanity-api/utils";
import useLocale from "../context/LocaleContext";

type Props = {
  input: NonNullable<PROJECTS_QUERY_RESULT>;
};

const ContentProjects = ({ input }: Props) => {
  const { locale } = useLocale();

  const { items } = input;
  const [thumbnail, setThumbnail] =
    React.useState<ProjectImageCoverAsset | null>(
      items?.[0]?.imageCover?.asset || null,
    );
  return (
    <div className='content content--projects'>
      <div className='grid grid-cols-5 gap-gutter '>
        <div className='items md:col-span-3'>
          <div className='header grid md:grid-cols-6 gap-gutter'>
            <div className='title'>{_localizeText(locale, "name")}</div>
            <div className='programme'>
              {_localizeText(locale, "programme")}
            </div>
            <div className='location'>{_localizeText(locale, "location")}</div>
            <div className='client'>{_localizeText(locale, "client")}</div>
            <div className='numbers'>{_localizeText(locale, "numbers")}</div>
            <div className='year'>{_localizeText(locale, "year")}</div>
          </div>
          {items?.map((item, index) => (
            <CardProjectTxt
              input={item as NonNullable<PROJECT_QUERY_RESULT>}
              key={index}
              setThumbnail={setThumbnail}
            />
          ))}
          {items?.map((item, index) => (
            <CardProjectTxt
              input={item as NonNullable<PROJECT_QUERY_RESULT>}
              key={index}
              setThumbnail={setThumbnail}
            />
          ))}
          {items?.map((item, index) => (
            <CardProjectTxt
              input={item as NonNullable<PROJECT_QUERY_RESULT>}
              key={index}
              setThumbnail={setThumbnail}
            />
          ))}
          {items?.map((item, index) => (
            <CardProjectTxt
              input={item as NonNullable<PROJECT_QUERY_RESULT>}
              key={index}
              setThumbnail={setThumbnail}
            />
          ))}
        </div>
        <div className='tbumnail md:col-span-2'>
          {thumbnail && <Figure asset={thumbnail} />}
        </div>
      </div>
    </div>
  );
};

export default ContentProjects;
