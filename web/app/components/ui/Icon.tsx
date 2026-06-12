import React from "react";

type Props = {
  name: "x";
};

const Icon = ({ name }: Props) => {
  return (
    <div className='icon'>
      {name === "x" && (
        <svg
          width='33'
          height='33'
          viewBox='0 0 33 33'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.984 33L0 32.004L15.504 16.5L0 0.984L0.984 0L16.488 15.504L32.004 0L33 0.984L17.484 16.5L33 32.004L32.004 32.988L16.5 17.484L0.984 33Z'
            fill='black'
          />
        </svg>
      )}
    </div>
  );
};

export default Icon;
