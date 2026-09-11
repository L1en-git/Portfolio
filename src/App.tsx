import SectionNav from "./components/SectionNav/SectionNav";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Contact from "./components/sections/Contact";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollToHash } from "./hooks/useScrollToHash";
import { SECTION_IDS } from "./data/profile";

function App() {
  const activeSection = useActiveSection(SECTION_IDS);
  useScrollToHash();

  return (
    <>
      <SectionNav activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </>
  );
}

export default App;
