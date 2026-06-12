"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import { SETTINGS_QUERY_RESULT } from "../types/sanity.types";
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
  const { scrollDirection, scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem(FIRST_VISIT_KEY)) return false;
    sessionStorage.setItem(FIRST_VISIT_KEY, "1");
    return true;
  });

  return (
    <header
      className={clsx(
        "header",
        isFirstVisit && "is-first-visit",
        isHome ? `scroll-${scrollDirection}` : "",
      )}>
      <div className='grid grid-cols-5 gap-gutter'>
        <div className='md:col-span-3'>
          <div className='site-name'>
            <Link href='/'>
              <RitaLogo animated={isHome} playIntro={isFirstVisit} />
            </Link>
          </div>
        </div>
        <div className='md:col-span-2'>
          {isHome && (
            <div className='description text-md'>
              {_localizeField(locale, settings?.siteDescription)}
            </div>
          )}
          <Nav input={settings} />
        </div>
      </div>
    </header>
  );
};

export default Header;
