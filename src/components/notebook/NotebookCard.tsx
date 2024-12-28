import React from "react";
import Link from "next/link";

interface NotebookCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const NotebookCard: React.FC<NotebookCardProps> = ({ title, imageUrl, link }) => {
  return (
    <div className="w-full max-w-[700px] mx-auto text-white border-2 border-primary cursor-pointer bg-transparent relative overflow-hidden rounded-lg">
      <Link href={link} className="no-underline hover:no-underline">
        <div className="w-full h-[300px] overflow-hidden">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt={`${title} display image`}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default NotebookCard;
