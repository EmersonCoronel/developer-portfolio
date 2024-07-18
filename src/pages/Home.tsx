import React from 'react';
import Header from '../components/general/Header';
import ProjectCard from '../components/home/ProjectCard';
import projects from '../components/home/projects';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center text-center">
          <p id="home-name">EMERSON CORONEL</p>
          <p id="home-subtext">SOFTWARE DEVELOPER</p>
        </div>
        <div className="row justify-content-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              imageUrl={project.imageUrl}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
