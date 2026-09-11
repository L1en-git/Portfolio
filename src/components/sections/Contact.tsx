import "./Contact.css";
import { profile } from "../../data/profile";

/** Sign-off section — id="contact". */
export default function Contact() {
  return (
    <section id="contact" className="sheet sheet--contact">
      <div className="grid-field" aria-hidden="true"></div>
      <p className="contact__stamp">SHEET NO. 003 — SIGN OFF</p>
      <h2 className="contact__headline">
        Let's build something
        <br />
        that holds up.
      </h2>
      <div className="contact__row">
        <a href={`mailto:${profile.email}`} className="btn btn--primary">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
          GitHub
        </a>
      </div>
      <p className="contact__footer">
        © {new Date().getFullYear()} {profile.name}. Drafted in a text editor, not a template.
      </p>
    </section>
  );
}
