"use client";
import React from "react";
import { PROJECT_QUERY_RESULT } from "../types/sanity.types";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import useLocale from "../context/LocaleContext";
import Link from "next/link";

export type ProjectImageCoverAsset = NonNullable<
  NonNullable<PROJECT_QUERY_RESULT>["imageCover"]
>["asset"];

type Props = {
  input: NonNullable<PROJECT_QUERY_RESULT>;
  setThumbnail: (thumbnail: ProjectImageCoverAsset | null) => void;
};

const CardProjectTxt = ({ input, setThumbnail }: Props) => {
  const { locale } = useLocale();
  const { title, programme, city, zip, client, numbers, year, imageCover } =
    input;
  return (
    <div
      className='card card--project--text'
      onMouseEnter={() => setThumbnail(imageCover?.asset || null)}>
      <Link href={_linkResolver(input)}>
        <div className='grid md:grid-cols-6 gap-gutter'>
          <h2>{_localizeField(locale, title)}</h2>
          <div className='programme'>{_localizeField(locale, programme)}</div>
          <div className='location'>
            <div>{city}</div>
            <div>{zip}</div>
          </div>
          <div className='client'>{client}</div>
          <div className='numbers'>{numbers}</div>
          <div className='year'>{year}</div>
        </div>
      </Link>
    </div>
  );
};

export default CardProjectTxt;
