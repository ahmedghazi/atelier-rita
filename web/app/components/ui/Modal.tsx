import React, { useEffect, useRef, useState } from "react";
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
    const maxX = window.innerWidth - el.width;
    const maxY = window.innerHeight - el.height;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    setPosition({ x: randX, y: randY });
  };

  useEffect(() => {
    if (open) {
      return;
    } else {
      if (isMobile) return;
      _randomlyPlaceModal();
    }
  }, [open, zIndex]);

  return (
    <Draggable
      position={position}
      onPositionChange={setPosition}
      disabled={isMobile}>
      <div
        ref={ref}
        className={clsx(
          "modal",
          open && "modal--open",
          styles.modal,
          open && styles.modal__open,
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex,
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
