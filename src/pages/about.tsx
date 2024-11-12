import React from "react";
import Header from "../components/general/Header";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 md:px-8 lg:w-3/4">
        <img
          className="opacity-90 w-1/2 p-4 float-right ml-5 mb-5"
          src="https://assets.emersoncoronel.com/images/emerson-coronel.webp"
          alt="Emerson Coronel"
        />
        <div className="content mt-12">
          <p className="text-left opacity-90 w-full font-montserrat text-primary text-lg mb-4">
            Welcome to my website! I&apos;m Emerson Coronel, a passionate and driven software developer. I graduated
            from Rice University in 2024 with a degree in Computer Science after three years of study. Since graduating,
            my technical endeavors have been marked by a drive to learn, explore, and build.
          </p>
          <p className="text-left opacity-90 w-full font-montserrat text-primary text-lg mb-4">
            I built this website as a platform to showcase the diverse projects I&apos;ve worked on, each reflecting my
            passion for solving real-world problems and building innovative solutions that I actually use in my daily
            life. For example, my friends and I love to play Catan, so I created a custom board generator just for us. I
            also recreated my favorite online typing test so I could practice right here on my own website.
            Additionally, I built Aristotle AI to guide me through my reading of the Nicomachean Ethics, making
            philosophy more interactive and dialectic. These projects are meant to demonstrate my ability to work across
            both the front and back end, integrating diverse platforms and technologies.
          </p>
          <p className="text-left opacity-90 w-full font-montserrat text-primary text-lg mb-4">
            In addition to my personal projects, I&apos;ve gained valuable experience across various software engineering roles. As a
            Software Engineer at Genjo.ai, I work within a small team to develop AI-powered sales assistants. I
            personally led the development of a React Native mobile app, integrating APIs and services to build a
            user-friendly front end connected to a robust backend. At New Direction, a Tel Aviv-based startup, I worked as
            a full-stack developer, working closely with company administrators and leading key projects to
            ensure rapid deployment. Additionally, as a Research Assistant in Dr. Randi Martin&apos;s Lab at Rice
            University, I conducted linguistic analysis using natural language processing, designing user-friendly
            workflows for non-technical staff to improve lab efficiency.
          </p>
          <p className="text-left opacity-90 w-full font-montserrat text-primary text-lg mb-4">
            In addition to my diverse experience as a software engineer, one area that particularly excites me is the
            potential for AI to reshape the world of digital education. I&apos;m especially interested in how AI-driven
            tutors and personalized learning platforms can democratize education and provide more adaptive, effective
            learning experiences for people around the world. This blend of technology and education is something
            I&apos;m passionate about pursuing into the future, and I&apos;m eager to see how AI can help make education
            more accessible and impactful globally.
          </p>
          <p className="text-left opacity-90 w-full font-montserrat text-primary text-lg mb-4">
            Thank you for visiting my website! If you&apos;d like to connect or have any questions, please don&apos;t
            hesitate to reach out at{" "}
            <Link
              href="mailto:contact@emersoncoronel.com"
              className="text-secondary font-montserrat opacity-90 underline hover:text-secondary transition-colors duration-300"
            >
              contact@emersoncoronel.com
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
