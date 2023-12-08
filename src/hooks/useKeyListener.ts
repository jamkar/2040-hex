import { useEffect } from "react";
import { KEYBOARD_EVENT } from "../constants";

export const useKeyListener = (handler: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener(KEYBOARD_EVENT, handler);
    return () => {
      document.removeEventListener(KEYBOARD_EVENT, handler);
    };
  }, [handler]);
};
