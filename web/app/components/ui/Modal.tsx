import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import clsx from "clsx";
import Icon from "./Icon";
import Draggable from "./Draggable";
import { usePageContext } from "@/app/context/PageContext";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import { publish } from "pubsub-js";
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
  const { isMobile } = useDeviceDetect();
  const { modalZIndex, setModalZIndex } = usePageContext();
  const [localZIndex, setLocalZIndex] = useState(zIndex);

  const bringToFront = useCallback(() => {
    const newZ = modalZIndex + 1;
    setLocalZIndex(newZ);
    setModalZIndex(newZ);
  }, [modalZIndex, setModalZIndex]);
  // const [delayOpen, setDelayOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const _onClose = () => {
    publish("FORMAT_CHANGED", {});
    onClose?.();
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        _onClose();
      }
    });
  }, []);

  const _randomlyPlaceModal = () => {
    const el = ref.current?.getBoundingClientRect();
    if (!el) return;
    const logo = document.querySelector("header .rita-logo");
    const logoRect = logo?.getBoundingClientRect();

    const maxX = window.innerWidth - el.width;
    const maxY = window.innerHeight - el.height;
    let randX = Math.random() * maxX;
    let randY = Math.random() * maxY;
    console.log(logoRect);
    // Check if the random position would overlap with the logo
    if (logoRect) {
      const logoRight = logoRect.left + logoRect.width;
      const logoBottom = logoRect.top + logoRect.height;
      const margin = Math.random() * 20;
      // If modal would overlap with logo, adjust position
      if (
        randX < logoRight &&
        randX + el.width > logoRect.left &&
        randY < logoBottom &&
        randY + el.height > logoRect.top
      ) {
        // Move modal to a position that doesn't overlap with logo
        // Try to position it to the right or below the logo
        if (logoRight + el.width < window.innerWidth) {
          randX = logoRight + margin; // Position to the right of logo with some margin
        } else if (logoBottom + el.height < window.innerHeight) {
          randY = logoBottom + margin; // Position below the logo with some margin
        }
      }
    }

    setPosition({ x: randX, y: randY });
  };

  useEffect(() => {
    if (open) return;
    if (isMobile) return;
    _randomlyPlaceModal();
  }, [open, isMobile]);

  return (
    <Draggable
      position={position}
      onPositionChange={setPosition}
      disabled={isMobile}>
      <div
        ref={ref}
        onMouseDown={bringToFront}
        className={clsx(
          "modal",
          open && "modal--open",
          styles.modal,
          open && styles.modal__open,
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: localZIndex,
        }}>
        <div className={clsx("modal__body", styles.modal__body, "hide-sb")}>
          {children}
        </div>
        <Draggable.Handle className={clsx("handle", styles.handle)}>
          <div className='handle-inner'></div>
        </Draggable.Handle>

        <div className={styles.footer}>
          <div
            onClick={_onClose}
            className={clsx(
              "modal__close",
              styles.modal__close,
              bigClose && styles.modal__close__big,
            )}>
            <Icon name='x' />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Modal;
