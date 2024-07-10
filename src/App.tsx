import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Catan from './pages/Catan';
import TypeTest from './pages/TypeTest';
import ParticlesComponent from './components/Particles';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

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
            <Route path="/type-test" element={<TypeTest />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
