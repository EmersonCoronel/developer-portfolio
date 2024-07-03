// src/pages/Catan.tsx

import React, { useEffect, useState } from 'react';
import { generateCatanBoard, BoardTile } from '../components/catan/generator/BoardGenerator';
import Tile from '../components/catan/CTile';
import Header from '../components/Header';

const Catan: React.FC = () => {
  const [board, setBoard] = useState<BoardTile[][]>([]);

  useEffect(() => {
    const generatedBoard = generateCatanBoard();
    setBoard(generatedBoard);
  }, []);

  return (
    <div>
      <Header />
      {board.length > 0 && board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
          {row.map((tile, tileIndex) => (
            <Tile
              key={`${rowIndex}-${tileIndex}`}
              resource={tile.resource || ''}
              number={tile.number}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Catan;
