import React, { useEffect, useState } from 'react';
import { generateCatanBoard, generateExpansionBoard, BoardTile } from './generator/BoardGenerator';
import CTile from './CTile';

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
    <div >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((tile, tileIndex) => (
            <CTile
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
