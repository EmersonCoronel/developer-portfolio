import React, { useState } from "react";
import Board from "./Board";
import styles from "./catan.module.css";

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
      <div className={styles.buttonContainer}>
        <button onClick={() => generateBoard(false)} className={styles.generateBoardButton}>
          Generate Regular Board
        </button>
        <button onClick={() => generateBoard(true)} className={styles.generateBoardButton}>
          Generate Expansion Board
        </button>
      </div>
    </div>
  );
};

export default Page;
