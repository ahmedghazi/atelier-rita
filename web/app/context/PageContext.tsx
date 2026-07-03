"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Settings, SETTINGS_QUERY_RESULT } from "../types/sanity.types";
import { useRandomItem } from "../hooks/useRandomItem";
import { subscribe, unsubscribe } from "pubsub-js";
// import { getSettings } from "../utils/sanity-queries";

type ContextProps = {
  layoutReady: boolean;
  layoutVersion: number;
  settings: SETTINGS_QUERY_RESULT;
  modalZIndex: number;
  headerHeight?: number;
  setModalZIndex: (zIndex: number | ((prev: number) => number)) => void;
};

const PageContext = createContext<ContextProps>({} as ContextProps);
// const PageContext = createContext({});

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  settings: SETTINGS_QUERY_RESULT;
  // pageContext: object;
}

export const PageContextProvider = (props: PageContextProps) => {
  const { children, settings } = props;
  const pathname = usePathname();
  // console.log(pathname);
  const [layoutReady, setLayoutReady] = useState<boolean>(false);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [modalZIndex, setModalZIndex] = useState<number>(99);
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(
    undefined,
  );

  const _randomColor = () => {
    if (!settings) return;
    const colors = settings.colors;
    if (!colors) return;
    const _randomColor = colors[Math.floor(Math.random() * colors.length)];
    console.log(_randomColor);
    document.documentElement.style.setProperty(
      "--color-accent",
      _randomColor?.hex || "red",
    );
    const rgb = `${_randomColor?.rgb?.r}, ${_randomColor?.rgb?.g}, ${_randomColor?.rgb?.b}`;
    document.documentElement.style.setProperty("--color-accent-rgb", rgb);
  };

  const _format = () => {
    // const wh = window.innerHeight;
    setLayoutReady(false);
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
      setHeaderHeight(headerBounding.height);
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
    setLayoutVersion((v) => v + 1);
  };

  useEffect(() => {
    _randomColor();
    _format();
    window.addEventListener("resize", _format);

    const token = subscribe("FORMAT_CHANGED", _format);

    return () => {
      window.removeEventListener("resize", _format);
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    const isHome = pathname === "/";
    document.body.classList.toggle("is-home", isHome);

    if (isHome) {
      _randomColor();
    }

    _format();
    setTimeout(() => {
      _format();
    }, 150);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove("is-loading");
    }, 300);
  }, [layoutReady]);

  return (
    <PageContext.Provider
      value={{
        settings,
        layoutReady,
        layoutVersion,
        modalZIndex,
        setModalZIndex,
        headerHeight,
      }}>
      {children}
    </PageContext.Provider>
  );
};

// export default PageContext;
// export { PageContext, PageContextProvider };

export const usePageContext = () => useContext(PageContext);
