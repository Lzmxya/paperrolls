import { RefObject, useEffect } from "react";

export const useSearchHotkeys = (
  inputRef: RefObject<null | HTMLInputElement>
) => {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const eventTarget = event.target as HTMLElement;
      const searchField = inputRef.current;
      const active = document.activeElement;

      if (!searchField) return;
      if (
        event.key === "Escape" &&
        active === searchField &&
        searchField.value === ""
      )
        searchField.blur();
      if (event.key !== "/" || event.ctrlKey || event.metaKey) return;
      if (/^(?:input|textarea)$/i.test(eventTarget.tagName)) return;

      event.preventDefault();
      searchField.focus();
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [inputRef]);
};
