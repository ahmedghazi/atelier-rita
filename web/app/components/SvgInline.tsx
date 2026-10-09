"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = { url: string; alt: string };

const SHAPES = "path, polyline, polygon, rect, circle, ellipse, line";

// fill blanc / très clair = "papier" dans Illustrator (cache les hachures
// dessous) : il ne doit pas devenir une forme pleine
function isLight(color: string) {
  const [r, g, b] = (color.match(/[\d.]+/g) || []).map(Number);
  if (r === undefined) return false;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.85;
}

function tagPaint(root: HTMLElement) {
  const tagged = [...root.querySelectorAll<SVGGraphicsElement>(SHAPES)].map(
    (el) => {
      const cs = getComputedStyle(el);
      const paint: string[] = [];
      if (el.tagName !== "line" && cs.fill !== "none")
        paint.push(isLight(cs.fill) ? "knockout" : "fill");
      if (cs.stroke !== "none" && parseFloat(cs.strokeWidth) > 0)
        paint.push("stroke");
      return { el, paint };
    },
  );

  // aucun trait ni remplissage sombre : les blancs SONT le dessin
  const hasInk = tagged.some(
    ({ paint }) => paint.includes("fill") || paint.includes("stroke"),
  );

  tagged.forEach(({ el, paint }) => {
    const final = hasInk
      ? paint
      : paint.map((p) => (p === "knockout" ? "fill" : p));
    if (final.includes("fill") || final.includes("knockout"))
      el.style.removeProperty("fill");
    if (final.includes("stroke")) el.style.removeProperty("stroke");
    el.dataset.paint = final.join(" ");
  });
}

const SvgInline = ({ url, alt }: Props) => {
  const [markup, setMarkup] = useState("");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/svg-proxy?url=${encodeURIComponent(url)}`)
      .then((r) => r.text())
      .then((text) => !cancelled && setMarkup(text))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url]);

  useLayoutEffect(() => {
    if (markup && ref.current) tagPaint(ref.current);
  }, [markup]);

  if (!markup) return null;
  return (
    <span
      ref={ref}
      className='svg-inline'
      role='img'
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default SvgInline;
