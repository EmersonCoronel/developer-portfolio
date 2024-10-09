import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Catan from "./pages/Catan";
import TypingChallenge from "./pages/TypingChallenge";
import ArtistotleAi from "./pages/ArtistotleAi";
import ParticlesComponent from "./components/general/Particles";

const App: React.FC = () => {
  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catan" element={<Catan />} />
            <Route path="/typingchallenge" element={<TypingChallenge />} />
            <Route path="/artistotle" element={<ArtistotleAi />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
