import React, { useEffect } from "react";
import { ListProjectsUI } from "@/app/types/schema";
import CardProject from "../CardProject";
import { publish } from "pubsub-js";

type Props = {
  input: ListProjectsUI;
};

const ModuleListProjectsUI = ({ input }: Props) => {
  const { items } = input;
  useEffect(() => {
    publish("IS_PROJECTS", true);

    return () => {
      publish("IS_PROJECTS", false);
    };
  }, []);

  return (
    <section className='module module--list-projects-ui'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-1- gap-x-md'>
        {items?.map((item, i) => (
          <CardProject input={item} key={i} />
        ))}
      </div>
    </section>
  );
};

export default ModuleListProjectsUI;
