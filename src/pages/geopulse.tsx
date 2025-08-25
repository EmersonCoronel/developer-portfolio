import React from "react";
import Header from "../components/general/Header";
import GeoPulseDisplay from "../components/geopulse/GeoPulseDisplay";

const GeoPulse: React.FC = () => {
  return (
    <>
      <Header />
      <GeoPulseDisplay />
    </>
  );
};

export default GeoPulse;
