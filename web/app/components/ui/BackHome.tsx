import Link from "next/link";
import React from "react";
import Icon from "./Icon";

const BackHome = () => {
  return (
    <div className='back-home'>
      <Link href='/'>
        <Icon name='x' />
      </Link>
    </div>
  );
};

export default BackHome;
