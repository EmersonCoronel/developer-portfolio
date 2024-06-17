import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const Home = () => {
  return (
    <>
      <Header />
      <div id="text-container" className="text-center">
        <p className="small-text white">Hi, I'm</p>
        <p id="name" className="white">Emerson Coronel,</p>
        <p className="small-text white">Full Stack Developer</p>
      </div>
    </>
  );
};

export default Home;
