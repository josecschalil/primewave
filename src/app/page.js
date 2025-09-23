import AboutMeSection from "./components/about";
import ProjectsShowcase from "./components/card-thumbnail";
import ContactMe from "./components/contact";
import ProgrammerPortfolio from "./components/navbar";

export default function Home() {
  return (
    <>
      <ProgrammerPortfolio />
      <ProjectsShowcase />
      <AboutMeSection />
      <ContactMe />
    </>
  );
}
