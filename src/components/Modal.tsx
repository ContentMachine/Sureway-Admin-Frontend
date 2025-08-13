"use client";

import { setAllModalsFalse } from "@/helpers/modalHandlers";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ModalProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  style?: React.CSSProperties;
  setState?: React.Dispatch<React.SetStateAction<any>>;
  onClick?: () => void;
}

const BackDrop = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)]"
      onClick={onClick}
    />
  );
};

const ModalOverlay = ({
  body,
  style,
}: {
  header?: React.ReactNode;
  body: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className="fixed top-1/2 left-1/2 z-50 flex min-h-[10vh] min-w-[10vw] max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-lg bg-white shadow-lg animate-fadeIn"
      style={style}
    >
      <div className="w-full h-full overflow-auto p-4 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-transparent">
        {body}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const backdropContainer =
    typeof document !== "undefined" && document.getElementById("backdrop");
  const modalOverlay =
    typeof document !== "undefined" && document.getElementById("modal-overlay");

  if (!mounted) return null;

  return (
    <div className="relative">
      {createPortal(
        <BackDrop
          onClick={() => {
            if (props?.setState) {
              setAllModalsFalse(props?.setState);
            }
            props?.onClick?.();
          }}
        />,
        backdropContainer || document.body
      )}
      {createPortal(
        <ModalOverlay
          header={props.header}
          body={props.body}
          style={props.style}
        />,
        modalOverlay || document.body
      )}
    </div>
  );
};

export default Modal;
