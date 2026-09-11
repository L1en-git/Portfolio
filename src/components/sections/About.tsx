import "./About.css";
import { useReveal } from "../../hooks/useReveal";
import { aboutRevealLines, aboutSpecs } from "../../data/profile";

/** Creative reveal section — id="about". */
export default function About() {
  const { ref: line1Ref, inView: line1InView } = useReveal<HTMLParagraphElement>();
  const { ref: line2Ref, inView: line2InView } = useReveal<HTMLParagraphElement>();
  const { ref: line3Ref, inView: line3InView } = useReveal<HTMLParagraphElement>();
  const lineRefs = [line1Ref, line2Ref, line3Ref];
  const lineInViews = [line1InView, line2InView, line3InView];

  const { ref: specCol1Ref, inView: specCol1InView } = useReveal<HTMLDivElement>();
  const { ref: specCol2Ref, inView: specCol2InView } = useReveal<HTMLDivElement>();
  const { ref: specCol3Ref, inView: specCol3InView } = useReveal<HTMLDivElement>();
  const specRefs = [specCol1Ref, specCol2Ref, specCol3Ref];
  const specInViews = [specCol1InView, specCol2InView, specCol3InView];

  return (
    <section id="about" className="sheet sheet--about">
      <div className="reveal-track">
        {aboutRevealLines.map((line, i) => (
          <p
            key={line}
            ref={lineRefs[i]}
            className={`reveal-line ${lineInViews[i] ? "in-view" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="specs">
        {aboutSpecs.map((spec, i) => (
          <div
            key={spec.label}
            ref={specRefs[i]}
            className={`specs__col ${specInViews[i] ? "in-view" : ""}`}
          >
            <p className="specs__label">{spec.label}</p>
            <p className="specs__value">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
