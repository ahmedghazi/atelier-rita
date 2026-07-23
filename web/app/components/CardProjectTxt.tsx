"use client";
import React from "react";
import { PROJECT_QUERY_RESULT } from "../types/sanity.types";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import useLocale from "../context/LocaleContext";
import Link from "next/link";
import CityAndZip from "./CityAndZip";

export type ProjectImageCoverAsset = NonNullable<
  NonNullable<PROJECT_QUERY_RESULT>["imageCover"]
>["asset"];

type Props = {
  input: NonNullable<PROJECT_QUERY_RESULT>;
  setThumbnail: (thumbnail: ProjectImageCoverAsset | null) => void;
};

const CardProjectTxt = ({ input, setThumbnail }: Props) => {
  const { locale } = useLocale();
  const {
    title,
    type,
    programme,
    city,
    zip,
    client,
    numbers,
    year,
    imageCover,
  } = input;

  const titleLocalized = _localizeField(locale, title) as string;
  const programmeLocalized = _localizeField(locale, programme) as string;
  const typeLocalized = _localizeField(locale, type) as string;
  return (
    <div
      className='tr card card--project--text'
      onMouseEnter={() => setThumbnail(imageCover?.asset || null)}>
      <Link href={_linkResolver(input)}>
        <div className=' grid grid-cols-2 md:grid-cols-7 gap-gutter'>
          <h2 className='td'>{titleLocalized}</h2>
          <div className='td type hidden-sm'>{typeLocalized}</div>
          <div className='td programme hidden-sm'>{programmeLocalized}</div>
          <div className='td location  hidden-sm'>
            <CityAndZip city={city} zip={zip} />
          </div>
          <div className='td client hidden-sm'>{client}</div>
          <div className='td numbers hidden-sm'>{numbers}</div>
          <div className='td year'>{year}</div>
        </div>
      </Link>
    </div>
  );
};

export default CardProjectTxt;
