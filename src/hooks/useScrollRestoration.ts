import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scrolls to the top of the page on a fresh navigation (e.g. clicking
 * "View project"). Skipped when:
 *  - the URL has a hash (see useScrollToHash — that owns scrolling in that case)
 *  - the navigation is a browser back/forward (POP) — the browser already
 *    restores the previous scroll position on its own in that case.
 */
export function useScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (location.hash) return;
    if (navigationType === "POP") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash, navigationType]);
}
