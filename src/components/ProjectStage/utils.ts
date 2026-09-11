export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/** Shortest signed distance from a card index to the current (possibly fractional) active position. */
export function wrapOffset(raw: number, total: number) {
  let o = raw % total;
  if (o > total / 2) o -= total;
  if (o < -total / 2) o += total;
  return o;
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function initials(title: string) {
  return title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
