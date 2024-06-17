import React from 'react';
import Header from '../components/Header';
import emersonImage from '../images/emerson.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const About = () => {
  return (
    <>
      <Header />
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col white">
            <img src={emersonImage} alt="Emerson" height="800" />
          </div>
          <div className="col white">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
