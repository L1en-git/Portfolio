import { useScrollRestoration } from "../hooks/useScrollRestoration";

/** Renders nothing — mounted once at the router root so it applies to every route. */
export default function ScrollRestoration() {
  useScrollRestoration();
  return null;
}
