import React from "react";
import Header from "../components/general/Header";
import ProjectCard from "../components/home/ProjectCard";
import projects from "../components/home/projects";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-montserrat tracking-widest text-primary opacity-80 text-[6.25vw] mt-24 pb-3 font-normal sm:whitespace-normal">
            EMERSON CORONEL
          </h1>

          <h2 className="font-montserrat text-primary opacity-80 text-[2.25vw] tracking-[0.35em] pb-20 font-normal">
            SOFTWARE DEVELOPER
          </h2>
        </div>

        <div className="flex flex-wrap justify-center" style={{ gap: "18vw" }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} title={project.title} imageUrl={project.imageUrl} link={project.link} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
