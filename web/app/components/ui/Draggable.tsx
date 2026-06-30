import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Position = { x: number; y: number };

type DraggableContextValue = {
  isDragging: boolean;
  onHandlePointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onHandlePointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onHandlePointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void;
};

const DraggableContext = createContext<DraggableContextValue | null>(null);

const useDraggableContext = () => {
  const ctx = useContext(DraggableContext);
  if (!ctx) {
    throw new Error("Draggable.Handle must be used within a Draggable");
  }
  return ctx;
};

type DraggableProps = {
  children: React.ReactNode;
  position: Position;
  onPositionChange: (position: Position) => void;
  disabled?: boolean;
};

const Draggable = ({
  children,
  position,
  onPositionChange,
  disabled = false,
}: DraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{
    startX: number;
    startY: number;
    origin: Position;
  } | null>(null);

  const onHandlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || e.target !== e.currentTarget) return;
    e.preventDefault();
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origin: position,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onHandlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const { startX, startY, origin } = dragState.current;
    onPositionChange({
      x: origin.x + (e.clientX - startX),
      y: origin.y + (e.clientY - startY),
    });
  };

  const onHandlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    dragState.current = null;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <DraggableContext.Provider
      value={{
        isDragging,
        onHandlePointerDown,
        onHandlePointerMove,
        onHandlePointerUp,
      }}>
      {children}
    </DraggableContext.Provider>
  );
};

type HandleProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Handle = ({ children, className, onClick }: HandleProps) => {
  const { isDragging, onHandlePointerDown, onHandlePointerMove, onHandlePointerUp } =
    useDraggableContext();

  return (
    <div
      className={className}
      data-dragging={isDragging || undefined}
      onClick={onClick}
      onPointerDown={onHandlePointerDown}
      onPointerMove={onHandlePointerMove}
      onPointerUp={onHandlePointerUp}
      onPointerCancel={onHandlePointerUp}>
      {children}
    </div>
  );
};

Draggable.Handle = Handle;

export default Draggable;
