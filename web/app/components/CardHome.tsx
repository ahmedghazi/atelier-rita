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

const InlineSvg = ({ url, alt }: { url: string; alt: string }) => {
  const [markup, setMarkup] = useState("");
  useEffect(() => {
    fetch(`/api/svg-proxy?url=${encodeURIComponent(url)}`)
      .then((r) => r.text())
      .then(setMarkup)
      .catch(() => {});
  }, [url]);

  if (!markup) return null;
  return (
    <span
      className='inline-svg'
      role='img'
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

type Props = {
  input: NonNullable<NonNullable<HOME_QUERY_RESULT>["items"]>[number];
};

const CardHomeComponent = ({ input }: Props) => {
  const { locale } = useLocale();
  const { image, project } = input;
  const { title, year, programme, city, client } = project ?? {};
  const [active, setActive] = useState<boolean>(false);
  const [flipDeg, setFlipDeg] = useState<number>(180);
  const tapCount = React.useRef<number>(0);
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
      tapCount.current += 1;
      if (tapCount.current === 1) {
        handleHover(e);
      } else {
        router.push(_linkResolver(project));
        tapCount.current = 0;
      }
    }
  };
  console.log(image?.asset?.extension, image?.asset?.url);
  const isSvg = image?.asset?.extension === "svg";
  return (
    <article
      className={clsx("card card--home", { "is-active": active })}
      style={{ "--flip-deg": `${flipDeg}deg` } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!isMobile) handleHover(e);
      }}
      onMouseLeave={(e) => {
        if (!isMobile) handleHover(e);
      }}>
      <Link onClick={_onCick} href={_linkResolver(project)}>
        <div className='perspective'>
          <div className='card--project__inner'>
            <div className='recto'>
              {!isSvg && <Figure asset={image?.asset} alt={titleLocalized} />}
              {isSvg && image?.asset?.url && (
                <InlineSvg url={image.asset.url} alt={titleLocalized} />
              )}
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

export default CardHomeComponent;
