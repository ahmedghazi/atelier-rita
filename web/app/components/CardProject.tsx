"use client";
import React, { useState } from "react";
import { Project } from "../types/sanity.types";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import clsx from "clsx";
import Link from "next/link";
import useLocale from "../context/LocaleContext";

type Props = {
  input: Project;
};

const CardProject = ({ input }: Props) => {
  const { locale } = useLocale();
  const { title, imageCover, year, programme, city, client } = input;
  const [active, setActive] = useState(false);
  const [flipDeg, setFlipDeg] = useState(180);

  const handleHover = (e: React.MouseEvent<HTMLElement>, isActive: boolean) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const enteredFromRight = e.clientX - rect.left > rect.width / 2;
    setFlipDeg(enteredFromRight ? -180 : 180);
    setActive(!active);
  };

  return (
    <article
      className={clsx("card card--project", { "is-active": active })}
      style={{ "--flip-deg": `${flipDeg}deg` } as React.CSSProperties}
      onMouseEnter={(e) => handleHover(e, true)}>
      <Link href={_linkResolver(input)}>
        <div className='perspective'>
          <div className='card--project__inner'>
            <div className='recto'>
              <Figure
                asset={imageCover?.asset}
                alt={_localizeField(locale, title)}
              />
            </div>
            <div className='verso'>
              <div className='header'>
                <div className='programme'>
                  {_localizeField(locale, programme)}
                </div>
                <div className='year'>{year}</div>
              </div>
              <div className='body'>
                <h2>{_localizeField(locale, title)}</h2>
              </div>
              <div className='footer'>
                <div className='city'>{city}</div>
                <div className='client'>{client}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardProject;
