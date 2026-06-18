"use client";
import React, { useEffect, useState } from "react";
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
import { useGridShrinkRange } from "../hooks/useGridShrinkRange";
import { usePageContext } from "../context/PageContext";
import useDeviceDetect from "../hooks/useDeviceDetect";

const FIRST_VISIT_KEY = "rita-first-visit";

type Props = {
  settings: SETTINGS_QUERY_RESULT;
};

const Header = ({ settings }: Props) => {
  const { locale } = useLocale();
  const { layoutReady, layoutVersion } = usePageContext();
  const { scrollDirection, scrollY } = useScroll();
  const { isMobile } = useDeviceDetect();
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

  const logoStartVar = isMobile ? "--gridder-2_2" : "--gridder-3_5";
  const logoEndVar = isMobile ? "--gridder-1_2" : "--gridder-1_5";

  const shrink = useGridShrinkRange(
    logoStartVar,
    logoEndVar,
    layoutReady,
    layoutVersion,
  );

  // pas d'intro sur les pages non-home => état "déjà shrink" par défaut
  const isShrunk = !isHome || (shrink ? scrollY >= shrink.range : false);

  return (
    <header
      className={clsx(
        "header",
        isFirstVisit && "is-first-visit",
        isHome && `scroll-${scrollDirection}`,
      )}>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-xs md:gap-gutter'>
        <div
          className={clsx(
            isShrunk ? "col-span-1" : "col-span-2",
            "md:col-span-3",
          )}>
          <div className='site-name'>
            <Link href='/'>
              <RitaLogo
                animated={isHome}
                playIntro={isHome}
                startVar={logoStartVar}
                endVar={logoEndVar}
              />
            </Link>
          </div>
        </div>
        <div
          className={clsx(
            "col-span-1 md:col-span-2",
            "transition-opacity duration-300",
            isMobile && (isShrunk ? "relative" : "absolute inset-0"),
            !isShrunk && "opacity-0 pointer-events-none",
            "md:opacity-100 md:pointer-events-auto",
          )}>
          {isHome && (
            <div className='description text-md hidden-sm'>
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
