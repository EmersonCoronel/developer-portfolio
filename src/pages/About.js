import React from 'react';
import Header from '../components/Header';
import skydiving from '../images/skydiving.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const About = () => {
  return (
    <>
      <Header />
      <div className="container text-center">
        <div className="row align-items-start">
          <h2 class="page-header-text">About Me</h2>
          <img src={skydiving} alt="Emerson Skydiving" id="skydiving"/>
          
        </div>
      </div>
    </>
  );
};

export default About;
