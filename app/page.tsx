import About from "@/components/about";
// import MouseFollower from "@/components/MouseFollower";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import SurrealExperience from "@/components/SurrealExperience";





export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      
      
      <SurrealExperience />
      <Intro />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Skills/>
      <SectionDivider />
      <Experience/>
      <SectionDivider />
      <Contact/>
   


    </main>
  )
}
