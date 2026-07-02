"use client";
import React, { useEffect, useState } from "react";
import { Project } from "../types/sanity.types";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import clsx from "clsx";
import Link from "next/link";
import useLocale from "../context/LocaleContext";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { useRouter } from "next/navigation";

type Props = {
  input: Project;
};

const CardProject = ({ input }: Props) => {
  const { locale } = useLocale();
  const { title, imageCover, year, programme, city, client } = input;
  const [active, setActive] = useState<boolean>(false);
  const [flipDeg, setFlipDeg] = useState<number>(180);
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const { isMobile } = useDeviceDetect();
  const titleLocalized = _localizeField(locale, title) as string;
  const programmeLocalized = _localizeField(locale, programme) as string;

  const handleHover = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const enteredFromRight = e.clientX - rect.left > rect.width / 2;
    setFlipDeg(enteredFromRight ? -180 : 180);
    setActive(!active);
  };

  const _onCick = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();

      if (isMobile) {
        setCount((prev) => prev + 1);
        if (count === 0) {
          handleHover(e);
        }
      } else {
        handleHover(e);
      }
    }
  };

  useEffect(() => {
    if (count > 1) {
      router.push(_linkResolver(input));
      setCount(0);
    }
  }, [count, input, router]);

  return (
    <article
      className={clsx("card card--project", { "is-active": active })}
      style={{ "--flip-deg": `${flipDeg}deg` } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!isMobile) handleHover(e);
      }}
      onMouseLeave={(e) => {
        if (!isMobile) handleHover(e);
      }}>
      <Link onClick={_onCick} href={_linkResolver(input)}>
        <div className='perspective'>
          <div className='card--project__inner'>
            <div className='recto'>
              <Figure asset={imageCover?.asset} alt={titleLocalized} />
            </div>
            <div className='verso'>
              <div className='header'>
                <div className='programme'>{programmeLocalized}</div>
                <div className='year'>{year}</div>
              </div>
              <div className='body'>
                <h2>{titleLocalized}</h2>
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
