import React from "react";
import Header from "../components/general/Header";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
          <img id="professionalimg"
            src="https://assets.emersoncoronel.com/images/emerson-coronel.webp"
            alt="Emerson Coronel"
          />
        <div className="content top-buffer">
          <p className="about-text">
            Welcome to my website! I&apos;m Emerson Coronel, a passionate and driven software developer. I graduated
            from Rice University in 2024 with a degree in Computer Science after three years of study. Since graduating,
            my technical endeavors have been marked by a drive to learn, explore, and build.
          </p>
          <p className="about-text">
            I built this website as a platform to showcase the diverse projects I&apos;ve worked on, each reflecting my
            passion for solving real-world problems and building innovative solutions that I actually use in my daily
            life. For example, my friends and I love to play Catan, so I created a custom board generator just for us. I
            also recreated my favorite online typing test so I could practice right here on my own website.
            Additionally, I built Aristotle AI to guide me through my reading of the Nicomachean Ethics, making
            philosophy more interactive and dialectic. These projects are meant to demonstrate my ability to work across
            both the front and back end, integrating diverse platforms and technologies.
          </p>
          <p className="about-text">
            In addition to my development skills, I&apos;ve gained valuable experience across multiple roles. As a
            Software Engineer at Genjo.ai, I worked within a small team to develop an AI-powered sales assistant. I
            personally lead the development of a react-native mobile app, integrating AWS APIs and services to build a
            user friendly front end connected to a robust backend. At New Direction, a Tel Aviv-based startup, I took on
            a full stack development role, working closely with company administrators and leading key projects to
            ensure high-quality delivery. Additionally, as a Research Assistant in Dr. Randi Martin&apos;s Lab at Rice
            University I conducted linguistic analysis using natural language processing, designing user-friendly
            workflows for non-technical staff to improve improve lab efficiency.
          </p>
          <p className="about-text">
            In addition to my diverse experience as a software engineer, one area that particularly excites me is the
            potential for AI to reshape the world of digital education. I&apos;m especially interested in how AI-driven
            tutors and personalized learning platforms can democratize education and provide more adaptive, effective
            learning experiences for people around the world. This blend of technology and education is something
            I&apos;m passionate about pursuing into the future, and I&apos;m eager to see how AI can help make education
            more accessible and impactful globally.
          </p>
          <p className="about-text">
            Thank you for visiting my website! Feel free to take a look at my CV{" "}
            <Link href="https://assets.emersoncoronel.com/CV.pdf" target="_blank" rel="noopener noreferrer">
              <i>here</i>
            </Link>{" "}
            and reach out at <Link href="mailto:contact@emersoncoronel.com">contact@emersoncoronel.com</Link>.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
