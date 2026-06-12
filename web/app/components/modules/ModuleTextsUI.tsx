"use client";
import React from "react";
import { PortableText } from "@portabletext/react";
import { TextsUI } from "@/app/types/schema";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { _localizeField } from "@/app/sanity-api/utils";
import useLocale from "@/app/context/LocaleContext";
import { motion } from "framer-motion";

type Props = {
  input: TextsUI;
};
const ModuleTextsUI = ({ input }: Props) => {
  const { locale } = useLocale();
  const { items } = input;

  return (
    <section className='module module--texts-ui'>
      <div className='bg-accent'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 0 } }}>
          <div className='scrollable hide-sb'>
            <div className='inner'>
              {items?.map((item, i) => (
                <div className='text' key={i}>
                  <PortableText
                    value={_localizeField(locale, item)}
                    components={portableTextComponents}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModuleTextsUI;
