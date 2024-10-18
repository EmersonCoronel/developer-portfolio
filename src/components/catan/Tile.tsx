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
      Wood: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/forest.svg`,
      Brick: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/hill.svg`,
      Wheat: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/field.svg`,
      Sheep: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/pasture.svg`,
      Ore: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/mountain.svg`,
      Desert: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/desert.svg`,
    };
    return resourceMap[resource] || `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/desert.svg`;
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
