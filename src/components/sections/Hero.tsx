import "./Hero.css";
import { profile, titleBlockRows } from "../../data/profile";

/** Cover sheet — id="home". */
export default function Hero() {
  return (
    <section id="home" className="sheet sheet--cover">
      <div className="grid-field" aria-hidden="true"></div>

      <header className="cover">
        <p className="cover__stamp">SHEET NO. 001 — GENERAL ARRANGEMENT</p>

        <h1 className="cover__name">
          {profile.name}
          <span className="cover__role">Software&nbsp;Engineer</span>
        </h1>

        <p className="cover__intro">
          I design and build software the way an engineer drafts a
          structure: measured, load-tested, and built to hold up under
          real use. I work across{" "}
          <strong>C#, Microsoft SQL Server, and Angular</strong>,
          turning client requirements into stable systems — and staying
          hands-on through testing, deployment, and post-launch support.
        </p>

        <div className="cover__actions">
          <a href="#work" className="btn btn--primary">
            View the work →
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get in touch
          </a>
        </div>
      </header>

      {/* Legend / contact block, styled like a blueprint title block */}
      <aside className="legend" id="about-legend">
        <p className="legend__title">TITLE BLOCK</p>
        <dl className="legend__rows">
          {titleBlockRows.map((row) => (
            <div className="legend__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          <div className="legend__row">
            <dt>Status</dt>
            <dd className="legend__status">
              <span className="dot"></span> Open to work
            </dd>
          </div>
        </dl>
        <div className="legend__contacts">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </aside>

      <div className="scroll-cue" aria-hidden="true">
        <span>SCROLL</span>
        <i></i>
      </div>
    </section>
  );
}
