import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the element matching the current URL hash whenever it changes. */
export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView({ behavior: "smooth" });
  }, [location]);
}
