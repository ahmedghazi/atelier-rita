"use client";
import React from "react";
import { SETTINGS_QUERY_RESULT } from "../types/sanity.types";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Link from "next/link";
import LocalesSwitcher from "./ui/LocaleSwitcher";
import useLocale from "../context/LocaleContext";

type Props = {
  input: SETTINGS_QUERY_RESULT;
};

const Nav = ({ input }: Props) => {
  const { locale } = useLocale();
  return (
    <nav>
      <LocalesSwitcher />

      <ul className='menu'>
        <li></li>
        <li></li>
        {input?.navPrimary?.map((item) => (
          <li key={item._key}>
            {item._type === "linkInternal" && (
              <Link href={_linkResolver(item.link)}>
                {item.label && _localizeField(locale, item.label)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
