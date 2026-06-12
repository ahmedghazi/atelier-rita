import clsx from "clsx";
import React from "react";

type Props = {};

const Gridder = (props: Props) => {
  const grids = [5];
  return (
    <div className='gridder'>
      <div className='px-md'>
        {grids.map((grid, i) => (
          <div
            key={i}
            className={clsx("grid gap-gutter", `md:grid-cols-${grid}`)}>
            {[...Array(grid).keys()].map((cell, i) => (
              <div
                key={i}
                data-size={`${cell + 1}_${grid}`}
                className={clsx(
                  "gridder__item",
                  `gridder-${cell + 1}_${grid}`,
                  `col-span-${cell + 1}`,
                )}>
                {cell + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gridder;
