import React from "react";
import Header from "../components/general/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <img src="/images/emerson.jpeg" alt="Emerson" id="professionalimg" />
        <div className="content top-buffer">
          <p className="about-text">
            Welcome to my website! I'm Emerson Coronel, a passionate and driven
            full stack developer. I graduated from Rice University in 2024 with
            a degree in Computer Science after three years of study. Since
            graduating, my technological pursuits have been characterized by a
            drive to learn, explore, and create.
          </p>
          <p className="about-text">
            I built this website myself as a platform to display my expertise in
            a variety of programming skills, with a particular focus on
            Typescript/Node, React, and Python. My experience extends across
            both the front and back end, enabling me to create dynamic and
            responsive web applications.
          </p>
          <p className="about-text">
            In addition to my development skills, I have professional experience
            as a video editor and photographer, which has given me a keen eye
            for detail and a deep understanding of various photo and video
            technologies. This unique combination of skills allows me to
            approach projects with a creative and technical mindset.
          </p>
          <p className="about-text">
            I am currently seeking a full-time position where I can leverage my
            strengths in independent learning and exploration, clear and
            thorough task delegation, and a process-oriented approach that
            values frequent feedback and iteration. I thrive in environments
            that challenge me to learn new technologies and solve complex
            problems, and I am excited about the opportunity to contribute to a
            forward-thinking team.
          </p>
          <p className="about-text">
            Thank you for visiting my website! Feel free to take a look at my CV{" "}
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">
              <i>here</i>
            </a>{" "}
            and reach out at{" "}
            <a href="mailto:dev@emersoncoronel.com">dev@emersoncoronel.com</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
