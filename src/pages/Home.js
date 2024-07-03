import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const Home = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="centered-container text-center">
          <p id="home-name">EMERSON CORONEL</p>
          <p id="home-subtext">SOFTWARE DEVELOPER</p>
        </div>
      </div>
    </>
  );
};

export default Home;