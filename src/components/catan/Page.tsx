import React, { useState } from "react";
import Board from "./Board";

const Page: React.FC = () => {
  const [expansion, setExpansion] = useState(false);
  const [key, setKey] = useState(0);

  const generateBoard = (expansion: boolean) => {
    setExpansion(expansion);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <Board key={key} expansion={expansion} />
      <div className="button-container">
        <button
          onClick={() => generateBoard(false)}
          className="generate-board-button"
        >
          Generate Regular Board
        </button>
        <button
          onClick={() => generateBoard(true)}
          className="generate-board-button"
        >
          Generate Expansion Board
        </button>
      </div>
    </div>
  );
};

export default Page;
