import "./SectionNav.css";
import { NAV_ITEMS } from "../../data/profile";

interface SectionNavProps {
  activeSection: string;
}

/** Fixed drafting-table corner nav. */
export default function SectionNav({ activeSection }: SectionNavProps) {
  return (
    <nav className="dial" aria-label="Section navigation">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`dial__mark ${activeSection === item.id ? "is-active" : ""}`}
          data-label={item.label}
        >
          <span></span>
        </a>
      ))}
    </nav>
  );
}
