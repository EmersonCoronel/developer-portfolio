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
            software developer. I graduated from Rice University in 2024 with a
            degree in Computer Science after three years of study. Since
            graduating, my technical endeavors have been marked by a drive to
            learn, explore, and build.
          </p>
          <p className="about-text">
            I built this website as a platform to showcase the diverse projects
            I've worked on, each reflecting my passion for solving real-world
            problems and building innovative solutions that I actually use in my
            daily life. For example, my friends and I love to play Catan, so I
            created a custom board generator just for us. I also recreated my
            favorite online typing test so I could practice right here on my own
            site. Additionally, I built Aristotle AI to guide me through my
            reading of Nicomachean Ethics, making philosophy more interactive
            and accessible. These projects demonstrate my ability to work across
            both the front and back end, with technologies like React, Node, and
            Machine Learning playing a central role.
          </p>
          <p className="about-text">
            In addition to my development skills, I’ve gained valuable
            experience across multiple roles. As a Software Engineer at
            Genjo.ai, I worked within a small team to develop an AI-powered
            sales assistant, leading the development of a mobile app and
            integrating AWS APIs and services to enhance user experience. At New
            Direction, a Tel Aviv-based startup, I took on a full stack
            development role, working closely with company administrators and
            leading key projects to ensure timely and high-quality delivery.
            Additionally, as a Research Assistant in Dr. Randi Martin’s Lab, I
            conducted linguistic analysis using natural language processing,
            designed user-friendly workflows to improve lab efficiency, and
            collaborated with non-technical researchers to streamline processes.
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
