"use client";
import React, { useEffect, useState } from "react";

type Props = {
  url: string;
  alt: string;
};

const SvgInline = ({ url, alt }: Props) => {
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
      className='svg-inline'
      role='img'
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default SvgInline;
