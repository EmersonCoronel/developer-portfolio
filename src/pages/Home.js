import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const Home = () => {
  const videoRef = useRef(null); // Step 2: Create a ref

  useEffect(() => { // Step 3: Adjust playbackRate after component mounts
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Half the normal speed
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div id="home-text-container" className="text-center">
          <p id="home-name">EMERSON CORONEL</p>
          <p id="home-subtext">SOFTWARE DEVELOPER</p>
        </div>
      </div>
    </>
  );
};

export default Home;