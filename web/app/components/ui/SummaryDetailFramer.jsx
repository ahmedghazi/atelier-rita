import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";

const SummaryDetailFramer = ({ summary, detail }) => {
  const [expand, setExpand] = useState(false);

  const controls = useAnimation();
  const variants = {
    expanded: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  useEffect(() => {
    if (expand) {
      controls.start("expanded");
    } else {
      controls.start("collapsed");
    }
  }, [expand, controls]);

  // useEffect(() => {
  //   onOpen(expand)
  // }, [expand, onOpen])

  return (
    <div className='summary-detail'>
      <div
        className={clsx(
          "summary",
          expand ? "bg-black text-secondary p-xs" : "b-b py-xs"
        )}
        onClick={() => setExpand(!expand)}
        onKeyUp={() => setExpand(!expand)}
        tabIndex='-1'
        role='button'>
        <div className='pointer-events-none '>
          <div className=' '>{summary}</div>
        </div>
      </div>
      <div className='detail'>
        <motion.div
          initial='collapsed'
          className='z-0 overflow-hidden'
          animate={controls}
          variants={variants}
          transition={{ duration: 0.3 }}>
          {detail}
        </motion.div>
      </div>
    </div>
  );
};

export default SummaryDetailFramer;
