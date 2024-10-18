import React, { useEffect, useState } from "react";
import { generateCatanBoard, generateExpansionBoard, BoardTile } from "./BoardGenerator";
import Tile from "./Tile";

interface BoardProps {
  expansion: boolean;
}

const Board: React.FC<BoardProps> = ({ expansion }) => {
  const [board, setBoard] = useState<BoardTile[][]>([]);

  useEffect(() => {
    const generatedBoard = expansion ? generateExpansionBoard() : generateCatanBoard();
    setBoard(generatedBoard);
  }, [expansion]);

  return (
    <div className="catan-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="catan-board-row">
          {row.map((tile, tileIndex) => (
            <Tile
              key={`${rowIndex}-${tileIndex}`}
              resource={tile.resource}
              number={tile.number}
              expansion={expansion}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
