import React from "react";
import Number from "./Number";
import Image from "next/image";

interface TileProps {
  resource: string;
  number: number;
  expansion: boolean;
}

const Tile: React.FC<TileProps> = ({ resource, number, expansion }) => {
  const getResourceImage = (resource: string): string => {
    const resourceMap: { [key: string]: string } = {
      Wood: "https://assets.emersoncoronel.com/images/catan/tiles/forest.webp",
      Brick: "https://assets.emersoncoronel.com/images/catan/tiles/hill.webp",
      Wheat: "https://assets.emersoncoronel.com/images/catan/tiles/field.webp",
      Sheep: "https://assets.emersoncoronel.com/images/catan/tiles/pasture.webp",
      Ore: "https://assets.emersoncoronel.com/images/catan/tiles/mountain.webp",
      Desert: "https://assets.emersoncoronel.com/images/catan/tiles/desert.webp",
    };
    return resourceMap[resource] || "https://assets.emersoncoronel.com/images/catan/tiles/desert.webp";
  };

  return (
    <div className={expansion ? "catan-tile-expansion" : "catan-tile"}>
      <img
        src={getResourceImage(resource)}
        alt={resource}
        className="tile-image"
      />
      <Number value={number} />
    </div>
  );
};

export default Tile;
