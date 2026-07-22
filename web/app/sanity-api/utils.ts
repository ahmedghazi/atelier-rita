import {
  LocaleBlockContent,
  LocaleString,
  LocaleText,
  PageModulaire,
  Project,
} from "../types/sanity.types";
import locales from "../config/i18n";

type LinkableNode = {
  _type?: string;
  slug?: { current?: string | null } | null;
} | null;

export const _localizeText = (locale: string, text: string) => {
  const currentI18N = locales[locale as keyof typeof locales];
  return currentI18N?.[text as keyof typeof currentI18N] ?? text;
};

export const _localizeField = (
  locale: string,
  field: LocaleString | LocaleText | LocaleBlockContent | null | undefined,
): string => {
  if (!field) return "";
  const localized = field as Record<string, unknown>;
  const ret = localized[locale] ? localized[locale] : localized["fr"];
  return ret as string;
  // return localized[locale] ?? localized["fr"] ?? "";
};

export const _linkResolver = (node: PageModulaire | Project | LinkableNode) => {
  if (!node || !node._type) return "/";
  if (node._type === "home") return "/";
  switch (node._type) {
    case "project":
      return `/project/${node.slug?.current}`;

    default:
      return `/${node.slug?.current}`;
  }
};

export const _preloadImages = (urls: string[]) => {
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
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
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

  return date.toLocaleDateString("fr-FR", {
    // weekday: "long",
    // year: "numeric",
    // month: "short",
    // day: "numeric",
    // hour: "numeric",
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

export function _removeFromArr<T>(arr: T[], ...toRemove: T[]) {
  toRemove.forEach((item) => {
    const index = arr.indexOf(item);
    if (index != -1) {
      arr.splice(index, 1);
    }
  });
  return arr;
}

export const _shuffle = <T>(array: T[]) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
