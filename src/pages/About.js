import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const About = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row align-items-start">
        <img src="/images/skydiving.jpg" alt="Emerson Skydiving" id="skydivingimg"/>
          <p className="about-text">Welcome to my website! I'm Emerson Coronel, a passionate and driven full stack developer with a strong foundation in software engineering. I graduated from Rice University in 2024 with a degree in Computer Science after three years of study. My pursuits in the tech world have been characterized by a constant drive to learn, explore, and innovate.</p>
          <p className="about-text">I built this website myself as platform to display my expertise in a variety of programming languages, with a particular focus on JavaScript/Node, Python, and Java. My experience extends to front-end technologies like React, Bootstrap, CSS, and HTML, enabling me to create dynamic and responsive web applications.</p>
          <p className="about-text">In addition to my development skills, I have professional experience as a video editor, which has given me a keen eye for detail and a deep understanding of various photo and video technologies. This unique combination of skills allows me to approach projects with a creative and technical mindset.</p>
          <p className="about-text">I am currently seeking a full-time position where I can leverage my strengths in independent learning and exploration, clear and thorough task delegation, and a process-oriented approach that values frequent feedback and iteration. I thrive in environments that challenge me to learn new technologies and solve complex problems, and I am excited about the opportunity to contribute to a forward-thinking team.</p>
          <p className="about-text">Thank you for visiting my website! Feel free to take a look at my CV <a href="/CV.pdf" target="_blank" rel="noopener noreferrer"><i>here</i></a> and reach out at <a href="mailto:dev@emersoncoronel.com">dev@emersoncoronel.com</a>.</p>
        </div>
      </div>
    </>
  );
};

export default About;
