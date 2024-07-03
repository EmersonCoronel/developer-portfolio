// src/components/Tile.tsx

import React from 'react';
import CNumber from './CNumber';

interface TileProps {
  resource: string;
  number: number | undefined;
}

const CTile: React.FC<TileProps> = ({ resource, number }) => {
  const getResourceImage = (resource: string): string => {
    const resourceMap: { [key: string]: string } = {
      Wood: './images/catan/tiles/forest.svg',
      Brick: './images/catan/tiles/hill.svg',
      Wheat: './images/catan/tiles/field.svg',
      Sheep: './images/catan/tiles/pasture.svg',
      Ore: './images/catan/tiles/mountain.svg',
      Desert: './images/catan/tiles/desert.svg',
    };
    return resourceMap[resource] || './images/catan/tiles/desert.svg';
  };

  return (
    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
      <img
        src={getResourceImage(resource)}
        alt={resource}
        style={{ width: '100%', height: '100%' }}
      />
      {number !== undefined && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px' }}>
          <CNumber value={number} />
        </div>
      )}
    </div>
  );
};

export default CTile;
