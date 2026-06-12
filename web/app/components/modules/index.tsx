"use client";
import React from "react";
import ModuleListProjectsUI from "./ModuleListProjectsUI";
// import { ModulesList } from "@/app/types/modules-list";
import ModuleTextsUI from "./ModuleTextsUI";
import { ModulesList } from "@/app/types/extra-types";
import "./index.scss";

const Modules = ({ modules }: ModulesList) => {
  // console.log(input);
  const _renderModules = () => {
    const _modules = modules.map((module: any, i: number) => {
      // console.log(module._type);
      switch (module._type) {
        case "listProjectsUI":
          return <ModuleListProjectsUI key={module._key} input={module} />;
        case "textsUI":
          return <ModuleTextsUI key={module._key} input={module} />;

        default:
          return null;
      }
    });
    return _modules;
  };

  return <div className='modules'>{_renderModules()}</div>;
};

export default Modules;
