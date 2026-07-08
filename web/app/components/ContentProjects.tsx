"use client";
import React, { useMemo, useState } from "react";
import {
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "../types/sanity.types";
import CardProjectTxt, { ProjectImageCoverAsset } from "./CardProjectTxt";
import Figure from "./ui/Figure";
import { _localizeField, _localizeText } from "../sanity-api/utils";
import useLocale from "../context/LocaleContext";
import clsx from "clsx";

type SortKey =
  | "title"
  | "programme"
  | "location"
  | "client"
  | "numbers"
  | "year";
type SortDir = "asc" | "desc";

type ThProps = {
  label: React.ReactNode;
  sortKey: SortKey;
  dataSort: "alpha" | "num";
  className: string;
  isActive: boolean;
  onClick: (key: SortKey) => void;
};

const Th = ({
  label,
  sortKey,
  dataSort,
  className,
  isActive,
  onClick,
}: ThProps) => {
  const [active, setActive] = useState<boolean>(false);
  const _onClick = () => {
    setActive(!active);
    onClick(sortKey);
  };
  return (
    <div
      // className={`${className}${isActive ? " is-active" : ""}`}
      className={clsx(className, active && "is-active")}
      data-sort={dataSort}
      onClick={_onClick}>
      {label}
    </div>
  );
};

type Props = {
  input: NonNullable<PROJECTS_QUERY_RESULT>;
};

const ContentProjects = ({ input }: Props) => {
  const { locale } = useLocale();

  const { items } = input;
  const [thumbnail, setThumbnail] = useState<ProjectImageCoverAsset | null>(
    null,
  );
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedItems = useMemo(() => {
    if (!items || !sortKey) return items;
    return [...items].sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      switch (sortKey) {
        case "title":
          aVal = (_localizeField(locale, a.title) as string) ?? "";
          bVal = (_localizeField(locale, b.title) as string) ?? "";
          break;
        case "programme":
          aVal = (_localizeField(locale, a.programme) as string) ?? "";
          bVal = (_localizeField(locale, b.programme) as string) ?? "";
          break;
        case "location":
          aVal = a.city ?? "";
          bVal = b.city ?? "";
          break;
        case "client":
          aVal = a.client ?? "";
          bVal = b.client ?? "";
          break;
        case "numbers":
          aVal = a.numbers ?? "";
          bVal = b.numbers ?? "";
          break;
        case "year":
          aVal = a.year ?? 0;
          bVal = b.year ?? 0;
          break;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [items, sortKey, sortDir, locale]);

  const isActive = (key: SortKey) => sortKey === key && sortDir === "desc";

  return (
    <div className='content content--projects'>
      <div className='grid md:grid-cols-5 gap-gutter '>
        <div className='items md:col-span-3'>
          <div className='thead'>
            <div className='tr grid grid-cols-3 md:grid-cols-6 gap-gutter'>
              <Th
                label={_localizeText(locale, "name")}
                sortKey='title'
                dataSort='alpha'
                className='th title'
                isActive={isActive("title")}
                onClick={handleSort}
              />
              <Th
                label={_localizeText(locale, "programme")}
                sortKey='programme'
                dataSort='alpha'
                className='th programme'
                isActive={isActive("programme")}
                onClick={handleSort}
              />
              <Th
                label={_localizeText(locale, "location")}
                sortKey='location'
                dataSort='alpha'
                className='th location'
                isActive={isActive("location")}
                onClick={handleSort}
              />
              <Th
                label={_localizeText(locale, "client")}
                sortKey='client'
                dataSort='alpha'
                className='th client hidden-sm'
                isActive={isActive("client")}
                onClick={handleSort}
              />
              <Th
                label={_localizeText(locale, "numbers")}
                sortKey='numbers'
                dataSort='alpha'
                className='th numbers hidden-sm'
                isActive={isActive("numbers")}
                onClick={handleSort}
              />
              <Th
                label={_localizeText(locale, "year")}
                sortKey='year'
                dataSort='num'
                className='th year hidden-sm'
                isActive={isActive("year")}
                onClick={handleSort}
              />
            </div>
          </div>
          <div className='tbody'>
            {sortedItems?.map((item, index) => (
              <CardProjectTxt
                input={item as NonNullable<PROJECT_QUERY_RESULT>}
                key={index}
                setThumbnail={setThumbnail}
              />
            ))}
          </div>
        </div>
        <div className='tbumnail md:col-span-2 hidden-sm'>
          {thumbnail && <Figure asset={thumbnail} />}
        </div>
      </div>
    </div>
  );
};

export default ContentProjects;
