"use client";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "./transition";
import "./index.scss";
import { slideInOutV2 } from "./transition-v2";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface LinkTransitionProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const LinkTransition = ({
  href,
  children,
  className = "",
  ...props
}: LinkTransitionProps) => {
  const router = useTransitionRouter();

  const _handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Ajouter un timeout pour s'assurer que la transition a le temps de se terminer
    try {
      // console.log("router", router);
      document.body.classList.add("is-transition");
      // Utiliser les options correctes pour next-view-transitions
      router.push(href, {
        onTransitionReady: () => {
          console.log("onTransitionReady");
          slideInOutV2("next", 500);
          setTimeout(() => {
            document.body.classList.remove("is-transition");
          }, 500);
        },
      });
    } catch (error) {
      console.error("Transition error:", error);
      // Fallback en cas d'erreur de transition
      router.push(href);
    }
  };
  return (
    <Link
      onClick={_handleTransition}
      href={href}
      className={className}
      {...props}>
      {children}
    </Link>
  );
};

export default LinkTransition;
