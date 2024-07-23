import React, { useState } from "react";
import Header from "../components/general/Header";
import { Board } from "catan-board-generator";

const Catan: React.FC = () => {
  const [expansion, setExpansion] = useState(false);
  const [key, setKey] = useState(0);

  const generateRegularBoard = () => {
    setExpansion(false);
    setKey((prevKey) => prevKey + 1);
  };

  const generateExpansionBoard = () => {
    setExpansion(true);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <Header />
      <Board key={key} expansion={expansion} />
      <div
        className="button-container"
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          onClick={generateRegularBoard}
          className="generate-board-button"
        >
          Generate Regular Board
        </button>
        <button
          onClick={generateExpansionBoard}
          className="generate-board-button"
        >
          Generate Expansion Board
        </button>
      </div>
    </div>
  );
};

export default Catan;
