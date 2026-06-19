import React from "react";

type Props = {
  city?: string;
  zip?: string;
};

const CityAndZip = ({ city, zip }: Props) => {
  return (
    <span className='city-n-zip'>
      {city && <span>{city}</span>}
      {city && zip && <span> </span>}
      {zip && <span>{zip}</span>}
    </span>
  );
};

export default CityAndZip;
