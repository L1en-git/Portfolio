import "./Work.css";
import ProjectStage from "../ProjectStage/ProjectStage";

/** Interactive overlapping project stack — id="work". */
export default function Work() {
  return (
    <section id="work" className="sheet sheet--work">
      <div className="work-head">
        <p className="work-head__stamp">SHEET NO. 002 — PROJECT INDEX</p>
        <h2>Selected work</h2>
        <p className="work-head__hint">Drag the card, or click its left / right edge.</p>
      </div>

      <ProjectStage />
    </section>
  );
}
