import { RefObject, useEffect } from "react";

export const useSearchHotkeys = (
  inputRef: RefObject<null | HTMLInputElement>
) => {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const input = inputRef.current;
      const active = document.activeElement;

      if (!input) {
        return;
      }
      if (event.code === "Slash" && active !== input) {
        event.preventDefault();
        input.focus();
      }
      if (event.code === "Escape" && active === input && input.value === "") {
        input.blur();
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [inputRef]);
};
