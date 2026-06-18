"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Nav from "./Nav";
import { LocaleString, SETTINGS_QUERY_RESULT } from "../types/sanity.types";
import Link from "next/link";
import website from "../config/website";
import RitaLogo from "./RitaLogo";
import { useScroll } from "../hooks/useScroll";
import clsx from "clsx";
import { _localizeField } from "../sanity-api/utils";
import useLocale from "../context/LocaleContext";
import { usePathname } from "next/navigation";

const FIRST_VISIT_KEY = "rita-first-visit";

type Props = {
  settings: SETTINGS_QUERY_RESULT;
};

const Header = ({ settings }: Props) => {
  const { locale } = useLocale();
  // const [randomDescription, setRandomDescription] =
  //   useState<LocaleString | null>(null);
  const { scrollDirection, scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem(FIRST_VISIT_KEY)) return false;
    sessionStorage.setItem(FIRST_VISIT_KEY, "1");
    return true;
  });

  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * 100000));
  }, []);

  const descriptions = settings?.siteDescriptions ?? [];

  const randomDescription =
    descriptions[randomIndex % descriptions.length] ?? "";

  return (
    <header
      className={clsx(
        "header",
        isFirstVisit && "is-first-visit",
        isHome ? `scroll-${scrollDirection}` : "",
      )}>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-xs md:gap-gutter'>
        <div className='md:col-span-3'>
          <div className='site-name'>
            <Link href='/'>
              <RitaLogo animated={isHome} playIntro={isHome} />
            </Link>
          </div>
        </div>
        <div className='md:col-span-2'>
          {isHome && (
            <div className='description text-md'>
              {_localizeField(locale, randomDescription)}
            </div>
          )}
          <Nav input={settings} />
        </div>
      </div>
    </header>
  );
};

export default Header;
