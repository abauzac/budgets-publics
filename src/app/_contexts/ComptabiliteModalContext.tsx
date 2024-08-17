import React, {
  createContext,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { BalanceCommuneInfos } from "../_utils/types";

export type ModalContextType = {
  handleClose: (event: MouseEvent) => void;
  handleOpen:  (event: MouseEvent, compte: BalanceCommuneInfos) => void;
  modalIsOpen: boolean;
  compte: BalanceCommuneInfos;
};

const ModalContext = createContext<ModalContextType >({} as any);
const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children, ...props }: {children: React.ReactNode}) => {
  const htmlTag = document.querySelector("html");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [compte, setCompte] = useState<BalanceCommuneInfos>();
  const modalAnimationDuration = 400;
  // Handle open
  const handleOpen = (event: MouseEvent, compte: BalanceCommuneInfos) => {
    event.preventDefault();
    if (htmlTag) {
      setModalIsOpen(true);
      setCompte(compte);
      htmlTag.classList.add("modal-is-open", "modal-is-opening");
      setTimeout(() => {
        htmlTag.classList.remove("modal-is-opening");
      }, modalAnimationDuration);
    }
  };

  // Handle close
  const handleClose = (event?: MouseEvent) => {
    event && event.preventDefault();
    if (htmlTag) {
      htmlTag.classList.add("modal-is-closing");
      setTimeout(() => {
        setModalIsOpen(false);
        htmlTag.classList.remove("modal-is-open", "modal-is-closing");
      }, modalAnimationDuration);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!modalIsOpen) return;
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalIsOpen]);

  // Set scrollbar width on mount
  //   useEffect(() => {
  //     const scrollBarWidth = getScrollBarWidth();
  //     htmlTag.style.setProperty("--pico-scrollbar-width", `${scrollBarWidth}px`);
  //     return () => {
  //       htmlTag.style.removeProperty("--pico-scrollbar-width");
  //     };
  //   }, []);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        compte: compte!,
        handleOpen,
        handleClose,
        ...props,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
