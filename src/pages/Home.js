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
        <div id="text-container" className="row">
          <div className="col text-center">
            <p id="name" className="white">EMERSON CORONEL</p>
            <p className="small-text white">FULL STACK DEVELOPER</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;