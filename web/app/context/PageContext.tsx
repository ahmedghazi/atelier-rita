"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
// import { getSettings } from "../utils/sanity-queries";

type ContextProps = {
  layoutReady: boolean;
  settings: {
    pathname: string;
  };
  modalZIndex: number;
  setModalZIndex: (zIndex: number | ((prev: number) => number)) => void;
};

const PageContext = createContext<ContextProps>({} as ContextProps);
// const PageContext = createContext({});

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

export const PageContextProvider = (props: PageContextProps) => {
  const { children } = props;
  const pathname = usePathname();
  // console.log(pathname);
  const [layoutReady, setLayoutReady] = useState<boolean>(false);
  const [modalZIndex, setModalZIndex] = useState<number>(99);
  const settings = {
    pathname,
  };

  const _format = () => {
    // const wh = window.innerHeight;

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // document.documentElement.style.setProperty("--app-height", wh + "px");

    const header = document.querySelector("header");
    let headerBounding = { height: 50 };
    if (header) {
      headerBounding = header.getBoundingClientRect();

      document.documentElement.style.setProperty(
        "--header-h",
        headerBounding.height + "px",
      );
    }

    const gridder = document.querySelector(".gridder");
    if (gridder) {
      const children = gridder.querySelectorAll(".gridder__item");
      if (children.length > 0) {
        Array.from(children).forEach((element) => {
          const bounding = element.getBoundingClientRect();
          const size = element.getAttribute("data-size");
          document.documentElement.style.setProperty(
            `--gridder-${size}`,
            bounding.width + "px",
          );
        });
      }
    }

    setLayoutReady(true);
  };

  useEffect(() => {
    _format();
    window.addEventListener("resize", _format);

    return () => {
      window.removeEventListener("resize", _format);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-home", pathname === "/");
    _format();
  }, [pathname]);

  useEffect(() => {
    document.body.classList.remove("is-loading");
  }, [layoutReady]);

  return (
    <PageContext.Provider
      value={{ settings, layoutReady, modalZIndex, setModalZIndex }}>
      {children}
    </PageContext.Provider>
  );
};

// export default PageContext;
// export { PageContext, PageContextProvider };

export const usePageContext = () => useContext(PageContext);
