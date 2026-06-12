import React from "react";
import {
  LocaleBlockContent,
  LocaleString,
  LocaleText,
  PageModulaire,
  Project,
} from "../types/sanity.types";
import locales from "../config/i18n";

export const _localizeText = (locale: string, text: string) => {
  const currentI18N = (locales as any)[`${locale}`];
  return currentI18N[text] ? currentI18N[text] : text;
};

export const _localizeField = (
  locale: string,
  field: LocaleString | LocaleText | LocaleBlockContent | any,
) => {
  if (!field) return "";
  return field && field[locale] ? field[locale] : field["fr"];
};

export const _linkResolver = (node: PageModulaire | Project | any) => {
  // console.log(node);
  // console.log(node._type);
  if (!node || !node._type) return "/";
  if (node._type === "home") return "/";
  switch (node._type) {
    case "project":
      return `/project/${node.slug?.current}`;

    default:
      return `/${node.slug?.current}`;
  }
};

export const _preloadImages = (urls: Array<string | any>) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

export const _revealEmail = (input: string) => {
  return input.replace("(at)", "@");
};

export const _slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const _date = (d: string) => {
  const date: Date = new Date(d);

  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  });
};

// export const _throttle = (func, wait) => {
//   let waiting = false;
//   return function () {
//     if (waiting) {
//       return;
//     }

//     waiting = true;
//     setTimeout(() => {
//       func.apply(this, arguments);
//       waiting = false;
//     }, wait);
//   };
// };

export const _randomNum = (number: number) => {
  const min = number * -1;
  const max = number * 1;
  return Math.random() * (max - min) + min;
};

export function _removeFromArr(arr: Array<any>, ...toRemove: Array<any> | any) {
  toRemove.forEach((item: any) => {
    var index = arr.indexOf(item);
    if (index != -1) {
      arr.splice(index, 1);
    }
  });
  return arr;
}

export const _shuffle = (array: any[]) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
