import { useEffect } from "react";

export function useBack(isActive: boolean, urlHash: string) {
  useEffect(() => {
    const hasHash = window.location.hash === `#${urlHash}`;

    if (isActive && !hasHash) {
      window.history.pushState(null, "", `#${urlHash}`);
      return;
    }

    if (!isActive && hasHash) {
      window.history.go(-1);
      return;
    }
  }, [isActive, urlHash]);
}
