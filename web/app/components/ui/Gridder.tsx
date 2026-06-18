import clsx from "clsx";
import React from "react";

const Gridder = () => {
  const mobileGrids = [2];
  const desktopGrids = [5, 10];

  return (
    <div className='gridder'>
      <div className='px-xs md:px-md'>
        {mobileGrids.map((grid, i) => (
          <div
            key={`mobile-${i}`}
            className={clsx("grid gap-sm md:hidden", `grid-cols-${grid}`)}>
            {[...Array(grid).keys()].map((cell, j) => (
              <div
                key={j}
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

        {desktopGrids.map((grid, i) => (
          <div
            key={i}
            className={clsx(
              "grid gap-sm md:gap-gutter",
              `md:grid-cols-${grid}`,
            )}>
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
