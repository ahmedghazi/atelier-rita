import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import clsx from "clsx";
import Icon from "./Icon";
import { usePageContext } from "@/app/context/PageContext";
type Props = {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  zIndex?: number;
  bigClose?: boolean;
};

const Modal = ({
  children,
  open = false,
  onClose,
  zIndex = 99,
  bigClose = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { modalZIndex, setModalZIndex } = usePageContext();
  // const [delayOpen, setDelayOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    });
  }, []);

  const _randomlyPlaceModal = () => {
    const el = ref.current?.getBoundingClientRect();
    if (!el) return;
    const maxX = window.innerWidth - el.width;
    const maxY = window.innerHeight - el.height;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    setPosition({ x: randX, y: randY });
  };
  // const _getZIndex = () => {
  //   const modals = document.querySelectorAll(".modal");
  //   return 99 + modals.length;
  // };

  useEffect(() => {
    if (open) {
      return;
    } else {
      _randomlyPlaceModal();
    }
  }, [open, setModalZIndex, zIndex]);

  return (
    <div
      ref={ref}
      className={clsx("modal", styles.modal, open && styles.modal__open)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex,
      }}>
      <div className={clsx(styles.modal__body, "hide-sb")}>{children}</div>
      <div
        className={clsx(
          "modal__close",
          styles.modal__close,
          bigClose && styles.modal__close__big,
        )}
        onClick={onClose}>
        <Icon name='x' />
      </div>
    </div>
  );
};

export default Modal;
