"use client";
import React, { useState, useEffect } from "react";
import { HOME_QUERY_RESULT } from "../types/sanity.types";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import clsx from "clsx";
import Link from "next/link";
import useLocale from "../context/LocaleContext";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { useRouter } from "next/navigation";
import SvgInline from "./SvgInline";

type Props = {
  input: NonNullable<NonNullable<HOME_QUERY_RESULT>["items"]>[number];
};

const CardHomeComponent = ({ input }: Props) => {
  const { locale } = useLocale();
  const { image, project, link } = input;
  const hasVerso = project !== null;
  // console.log("project", project);
  const { title, year, type, programme, city, client } = project ?? {};
  const [active, setActive] = useState<boolean>(false);
  const [flipDeg, setFlipDeg] = useState<number>(180);
  const tapCount = React.useRef<number>(0);
  const router = useRouter();
  const { isMobile } = useDeviceDetect();
  const titleLocalized = _localizeField(locale, title) as string;
  // const programmeLocalized = _localizeField(locale, programme) as string;
  const typeLocalized = _localizeField(locale, type) as string;
  const linkHref = project ? _linkResolver(project) : link || "";
  const target = project ? "_self" : "_blank";

  const handleHover = (e: React.MouseEvent<HTMLElement>, _active: boolean) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const enteredFromRight = e.clientX - rect.left > rect.width / 2;
    setFlipDeg(enteredFromRight ? -180 : 180);
    setActive(_active);
  };

  const _onCick = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      tapCount.current += 1;
      if (tapCount.current === 1) {
        handleHover(e, true);
      } else {
        router.push(_linkResolver(project));
        tapCount.current = 0;
      }
    }
  };
  const isSvg =
    /\.svg($|\?)/i.test(image?.asset?.url ?? "") ||
    image?.asset?.extension === "svg";
  return (
    <article
      className={clsx(
        "card card--home",
        { "is-active": active },
        {
          "has-verso": hasVerso,
        },
        {
          "has-link": linkHref !== "",
        },
      )}
      style={{ "--flip-deg": `${flipDeg}deg` } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!isMobile) handleHover(e, true);
      }}
      onMouseLeave={(e) => {
        if (!isMobile) handleHover(e, false);
      }}>
      <Link onClick={_onCick} href={linkHref} target={target}>
        <div className='perspective'>
          <div className='card--home__inner'>
            <div className='recto'>
              {!isSvg && <Figure asset={image?.asset} alt={titleLocalized} />}
              {isSvg && image?.asset?.url && (
                <SvgInline url={image.asset.url} alt={titleLocalized} />
              )}
            </div>
            <div className='verso'>
              <div className='header'>
                {/* <div className='programme'>{programmeLocalized}</div> */}
                <div className='ty'>{typeLocalized}</div>
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

export default CardHomeComponent;
