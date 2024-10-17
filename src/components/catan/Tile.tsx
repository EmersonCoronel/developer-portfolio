import React from 'react';
import Number from './Number';

interface TileProps {
  resource: string;
  number: number;
  expansion: boolean;
}

const Tile: React.FC<TileProps> = ({ resource, number, expansion }) => {
  const getResourceImage = (resource: string): string => {
    const resourceMap: { [key: string]: string } = {
      Wood: '/images/catan/tiles/forest.svg',
      Brick: '/images/catan/tiles/hill.svg',
      Wheat: '/images/catan/tiles/field.svg',
      Sheep: '/images/catan/tiles/pasture.svg',
      Ore: '/images/catan/tiles/mountain.svg',
      Desert: '/images/catan/tiles/desert.svg',
    };
    return resourceMap[resource] || '/images/catan/tiles/desert.svg';
  };

  return (
    <div className={expansion ? 'catan-tile-expansion' : 'catan-tile'}>
      <img
        src={getResourceImage(resource)}
        alt={resource}
        className='tile-image'
      />
      <Number value={number} />
    </div>
  );
};

export default Tile;
