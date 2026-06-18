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
      className='tr card card--project--text'
      onMouseEnter={() => setThumbnail(imageCover?.asset || null)}>
      <Link href={_linkResolver(input)}>
        <div className=' grid grid-cols-3 md:grid-cols-6 gap-gutter'>
          <h2 className='td'>{_localizeField(locale, title)}</h2>
          <div className='td programme'>
            {_localizeField(locale, programme)}
          </div>
          <div className='td location'>
            <div>{city}</div>
            <div>{zip}</div>
          </div>
          <div className='td client hidden-sm'>{client}</div>
          <div className='td numbers hidden-sm'>{numbers}</div>
          <div className='td year hidden-sm'>{year}</div>
        </div>
      </Link>
    </div>
  );
};

export default CardProjectTxt;
