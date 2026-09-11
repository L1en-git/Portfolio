import { Link, useParams } from "react-router-dom";
import "./ProjectDetails.css";
import { projects } from "../../data/projects";
import ProjectGallery from "./ProjectGallery";

export default function ProjectDetails() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project) {
    return (
      <section className="sheet sheet--project-details">
        <div className="grid-field" aria-hidden="true"></div>
        <Link to="/#work" className="project-details__back">
          ← Back to work
        </Link>
        <p className="project-details__stamp">SHEET NOT FOUND</p>
        <h1 className="project-details__title">Project not found</h1>
        <p className="project-details__text">
          That project doesn't exist (or moved). Head back to the project index.
        </p>
      </section>
    );
  }

  return (
    <section className="sheet sheet--project-details">
      <div className="grid-field" aria-hidden="true"></div>

      <Link to="/#work" className="project-details__back">
        ← Back to work
      </Link>

      <header className="project-details__head">
        <p className="project-details__stamp">
          SHEET NO. 002.{String(index + 1).padStart(2, "0")} — PROJECT DETAIL
        </p>
        <h1 className="project-details__title">{project.title}</h1>

        <ul className="project-details__stack" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <li className="project-details__tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-details__actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
            >
              Live demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              Source code →
            </a>
          )}
        </div>
      </header>

      {project.images && project.images.length > 0 && (
        <ProjectGallery images={project.images} />
      )}

      <div className="project-details__body">
        <section className="project-details__section">
          <p className="project-details__label">OVERVIEW</p>
          <p className="project-details__text">{project.longDescription}</p>
        </section>

        <section className="project-details__section project-details__section--role">
          <p className="project-details__label">MY ROLE</p>
          <p className="project-details__text">{project.role}</p>
        </section>

        <section className="project-details__section">
          <p className="project-details__label">KEY FEATURES</p>
          <ul className="project-details__list">
            {project.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        {project.challenges && (
          <section className="project-details__section">
            <p className="project-details__label">CHALLENGES</p>
            <p className="project-details__text">{project.challenges}</p>
          </section>
        )}
      </div>

      <Link to="/#work" className="btn btn--ghost project-details__footer-back">
        ← Back to work
      </Link>
    </section>
  );
}
