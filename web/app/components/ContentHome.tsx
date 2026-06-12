import React from "react";
import { HOME_QUERY_RESULT, Project } from "../types/sanity.types";
import CardProject from "./CardProject";

type Props = {
  input: HOME_QUERY_RESULT;
};

const ContentHome = ({ input }: Props) => {
  // const { projects } = input;
  return (
    <div className='content--home '>
      <div className='grid md:grid-cols-5 gap-gutter' style={{}}>
        {input?.projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
        {input?.projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
        {input?.projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
        {input?.projects?.map((item, index) => (
          <CardProject input={item as unknown as Project} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ContentHome;
