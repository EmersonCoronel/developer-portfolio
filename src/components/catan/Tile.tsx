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
      Wood: "https://assets.emersoncoronel.com/images/catan/tiles/forest.svg",
      Brick: "https://assets.emersoncoronel.com/images/catan/tiles/hill.svg",
      Wheat: "https://assets.emersoncoronel.com/images/catan/tiles/field.svg",
      Sheep: "https://assets.emersoncoronel.com/images/catan/tiles/pasture.svg",
      Ore: "https://assets.emersoncoronel.com/images/catan/tiles/mountain.svg",
      Desert: "https://assets.emersoncoronel.com/images/catan/tiles/desert.svg",
    };
    return resourceMap[resource] || "https://assets.emersoncoronel.com/images/catan/tiles/desert.svg";
  };

  return (
    <div className={expansion ? "catan-tile-expansion" : "catan-tile"}>
      <Image
        src={getResourceImage(resource)}
        alt={resource}
        className="tile-image"
        layout="responsive"
        width={1}
        height={1}
        priority={true}
      />
      <Number value={number} />
    </div>
  );
};

export default Tile;
