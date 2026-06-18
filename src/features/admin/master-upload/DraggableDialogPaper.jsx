import React, { forwardRef, useRef, useState } from "react";
import Paper from "@mui/material/Paper";

const DraggableDialogPaper = forwardRef(function DraggableDialogPaper(props, ref) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  const handleMouseDown = (event) => {
    if (!event.target.closest("[data-dialog-drag-handle='true']")) return;
    if (event.target.closest("button,a,input,select,textarea,[role='button']")) return;

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      initialX: position.x,
      initialY: position.y,
    };

    const handleMouseMove = (moveEvent) => {
      if (!dragRef.current) return;

      setPosition({
        x: dragRef.current.initialX + moveEvent.clientX - dragRef.current.startX,
        y: dragRef.current.initialY + moveEvent.clientY - dragRef.current.startY,
      });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Paper
      {...props}
      ref={ref}
      onMouseDown={handleMouseDown}
      style={{
        ...props.style,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
});

export default DraggableDialogPaper;
