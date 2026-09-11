import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectStage.css";
import { projects } from "../../data/projects";
import {
  RADIUS,
  ANGLE_STEP,
  DRAG_STEP_PX,
  MAX_VISIBLE_OFFSET,
  CLICK_THRESHOLD,
  BACK_START_DEG,
  BACK_FULL_DEG,
  BACK_MAX_OPACITY,
  FRONT_FADE_START_DEG,
  MIN_FRONT_OPACITY,
  MAX_BEND,
} from "./constants";
import { pad, mod, wrapOffset, smoothstep, initials } from "./utils";

const TOTAL = projects.length;

export default function ProjectStage() {
  const [active, setActive] = useState(0);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const frontFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capLeftRefs = useRef<(SVGPathElement | null)[]>([]);
  const capRightRefs = useRef<(SVGPathElement | null)[]>([]);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const dragRef = useRef({ dragging: false, startX: 0, dragProgress: 0, moved: false });

  const applyTransforms = useCallback((continuousActive: number, animate: boolean) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const offset = wrapOffset(i - continuousActive, TOTAL);
      const absOffset = Math.abs(offset);
      const angleDeg = offset * ANGLE_STEP;
      const angleRad = (angleDeg * Math.PI) / 180;
      const absAngle = Math.abs(angleDeg);
      const clamped = Math.min(absOffset, MAX_VISIBLE_OFFSET);

      // The card follows the surface of an invisible cylinder. The X/Z values
      // are the actual circular path of the card's center; rotateY turns the
      // card with that path. This is deliberately NOT a flat translateX slide.
      const x = RADIUS * Math.sin(angleRad);
      const z = RADIUS * (1 - Math.cos(angleRad));

      // Keep the front readable in the center, then naturally thin it as the
      // card turns edge-on. A small translucent back face appears underneath
      // during the roll instead of the card simply disappearing.
      const backT = smoothstep(BACK_START_DEG, BACK_FULL_DEG, absAngle);
      const frontT = smoothstep(FRONT_FADE_START_DEG, 90, absAngle);
      const distanceFade = Math.max(0, 1 - clamped / MAX_VISIBLE_OFFSET);

      el.style.transition = animate
        ? "transform 620ms cubic-bezier(0.18, 0.82, 0.22, 1), opacity 420ms ease"
        : "none";

      el.style.transform =
        `translate3d(calc(-50% + ${x}px), 0, ${-z}px) ` +
        `rotateY(${-angleDeg}deg)`;
      el.style.opacity = String(Math.max(0, distanceFade));
      el.style.zIndex = String(300 - Math.round(absOffset * 20));
      el.style.pointerEvents = distanceFade > 0.03 ? "auto" : "none";

      const front = frontFaceRefs.current[i];
      if (front) {
        front.style.transition = animate
          ? "opacity 620ms cubic-bezier(0.18, 0.82, 0.22, 1)"
          : "none";
        front.style.opacity = String(1 - frontT * (1 - MIN_FRONT_OPACITY));
      }

      const back = backFaceRefs.current[i];
      if (back) {
        back.style.transition = animate
          ? "opacity 620ms cubic-bezier(0.18, 0.82, 0.22, 1)"
          : "none";
        back.style.opacity = String(backT * BACK_MAX_OPACITY);
      }

      // A rigid rotated rectangle can't produce curved edges on its own —
      // perspective keeps straight lines straight. So the left/right edges are
      // separate arcs: flat at dead center (bend = 0, "still rectangular" as
      // required), bowing backward together as the card turns — matching a
      // label wrapped around an upright cylinder, since rotation happens
      // around the vertical (Y) axis, so it's the vertical edges that curve,
      // not the horizontal ones.
      // Eased, not linear: this is what makes the card you're actively
      // dragging visibly curve right from the first pixel of movement,
      // instead of needing to travel far before it looks any different from
      // a flat rectangle — matching the neighbors, which already sit at a
      // fixed curved offset even at rest.
      const bendT = Math.pow(clamped / MAX_VISIBLE_OFFSET, 0.5);
      const bend = bendT * MAX_BEND;
      capLeftRefs.current[i]?.setAttribute("d", `M0,0 Q${-bend},50 0,100`);
      capRightRefs.current[i]?.setAttribute("d", `M100,0 Q${100 + bend},50 100,100`);
    });
  }, []);

  useEffect(() => {
    applyTransforms(active, true);
  }, [active, applyTransforms]);

  const goTo = useCallback((index: number) => {
    setActive(mod(index, TOTAL));
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      goTo(activeRef.current + dir);
    },
    [goTo]
  );

  // Drag / swipe + click-zone navigation, all through one pointer lifecycle
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onPointerDown = (e: PointerEvent) => {
      // Let the "View project" link (or any real link/button) handle its
      // own click normally — don't hijack the pointer for the drag gesture,
      // or setPointerCapture below breaks the link's click before it fires.
      if ((e.target as HTMLElement).closest("a, button")) return;

      dragRef.current = { dragging: true, startX: e.clientX, dragProgress: 0, moved: false };
      stage.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.dragging) return;
      const delta = e.clientX - dragRef.current.startX;
      if (Math.abs(delta) > CLICK_THRESHOLD) dragRef.current.moved = true;
      dragRef.current.dragProgress = -delta / DRAG_STEP_PX;
      applyTransforms(activeRef.current + dragRef.current.dragProgress, false);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current.dragging) return;
      dragRef.current.dragging = false;

      if (!dragRef.current.moved) {
        // Genuine click, not a drag. Pointer capture means e.target is
        // always the stage by this point, so find the real element
        // under the pointer directly instead.
        const hit = document.elementFromPoint(e.clientX, e.clientY);
        const target = (hit as HTMLElement | null)?.closest<HTMLElement>("[data-card-index]");
        if (!target) return;
        const idx = Number(target.dataset.cardIndex);

        // Clicking the front card does nothing — only dragging it navigates.
        // Clicking a side card still jumps straight to it.
        if (idx !== activeRef.current) {
          goTo(idx);
        }
        return;
      }

      const finalContinuous = activeRef.current + dragRef.current.dragProgress;
      const newActive = mod(Math.round(finalContinuous), TOTAL);

      // Always animate to the resolved position, even when it's the same
      // index you started from — that's the "snap back to normal" case
      // (a small swipe that didn't go far enough to change pages). Relying
      // only on setActive isn't enough: React skips re-running effects when
      // the value doesn't change, so a snap-back to the same index would
      // otherwise never animate and the card would stay frozen mid-drag.
      applyTransforms(newActive, true);
      setActive(newActive);
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [applyTransforms, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <div className="carousel">
      <div
        className="carousel__stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Projects — drag, or click a card's left or right side to navigate"
        onKeyDown={onKeyDown}
      >
        {projects.map((project, i) => (
          <article
            key={project.title}
            className="carousel__card"
            data-card-index={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            aria-hidden={i !== active}
          >
            <svg
              className="carousel__cap carousel__cap--left"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={(el) => {
                  capLeftRefs.current[i] = el;
                }}
                d="M0,0 Q0,50 0,100"
              />
            </svg>

            <div
              className="carousel__face carousel__face--front"
              ref={(el) => {
                frontFaceRefs.current[i] = el;
              }}
            >
              <div>
                <p className="card__index">
                  {pad(i + 1)} / {pad(TOTAL)}
                </p>
                <h3 className="card__title">{project.title}</h3>
                <p className="card__desc">{project.description}</p>
              </div>
              <div>
                <div className="card__tags">
                  {project.tags.map((tag) => (
                    <span className="card__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  className="card__link"
                  to={`/projects/${project.slug}`}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  View project →
                </Link>
              </div>
            </div>

            <div
              className="carousel__face carousel__face--back"
              aria-hidden="true"
              ref={(el) => {
                backFaceRefs.current[i] = el;
              }}
            >
              <span className="carousel__back-mark">{initials(project.title)}</span>
              <span className="carousel__back-label">PROJECT {pad(i + 1)}</span>
            </div>

            <svg
              className="carousel__cap carousel__cap--right"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={(el) => {
                  capRightRefs.current[i] = el;
                }}
                d="M100,0 Q100,50 100,100"
              />
            </svg>
          </article>
        ))}
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Project position">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === active ? "is-active" : ""}`}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
