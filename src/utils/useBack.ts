import { useEffect, useLayoutEffect, useRef } from "react";

export function useBack(
  isActive: boolean,
  onBack: () => void,
  urlHash: string
) {
  const callbackRef = useRef(onBack);

  useLayoutEffect(() => {
    callbackRef.current = onBack;
  });

  useEffect(() => {
    const hasHash = window.location.hash === `#${urlHash}`;

    window.addEventListener("popstate", () => callbackRef.current());

    if (isActive && !hasHash) {
      history.pushState(null, "", `#${urlHash}`);
    }
    if (!isActive && hasHash) {
      history.go(-1);
    }

    return () => {
      window.removeEventListener("popstate", () => callbackRef.current());
    };
  }, [isActive, onBack, urlHash]);
}
