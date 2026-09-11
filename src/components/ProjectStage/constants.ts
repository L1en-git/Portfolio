export const RADIUS = 235; // radius of the invisible rolling drum
export const ANGLE_STEP = 45; // one project = one drum rotation step
export const DRAG_STEP_PX = 125; // px of pointer travel that equals one full step — kept low so a normal swipe visibly rolls, not just a long deliberate drag
export const MAX_VISIBLE_OFFSET = 2.05;
export const CLICK_THRESHOLD = 6; // px of movement below which a pointer gesture counts as a click, not a drag

export const BACK_START_DEG = 35;
export const BACK_FULL_DEG = 82;
export const BACK_MAX_OPACITY = 0.42;
export const FRONT_FADE_START_DEG = 55;
export const MIN_FRONT_OPACITY = 0.18;
export const MAX_BEND = 7; // viewBox units of left/right edge curvature at max offset (viewBox now spans the full card width, ~300px, so this maps to roughly a 20px bulge); 0 at dead center
