import React from "react";
import Header from "../components/general/Header";
import ProjectCard from "../components/home/ProjectCard";
import projects from "../components/home/projects";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center text-center">
          <h1 id="home-name">EMERSON CORONEL</h1>
          <h2 id="home-subtext">SOFTWARE DEVELOPER</h2>
        </div>
        <div className="row justify-content-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} title={project.title} imageUrl={project.imageUrl} link={project.link} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
