import React from 'react';
import CNumber from './CNumber';

interface TileProps {
  resource: string;
  number: number;
  expansion: boolean;
}

const CTile: React.FC<TileProps> = ({ resource, number, expansion }) => {
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
    <div className={expansion ? 'catan-tile-expansion' : 'catan-tile'}>
      <img
        src={getResourceImage(resource)}
        alt={resource}
        style={{ width: '100%', height: '100%' }}
      />
      <CNumber value={number} expansion={expansion} />
    </div>
  );
};

export default CTile;
