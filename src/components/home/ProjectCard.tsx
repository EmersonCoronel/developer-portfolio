import React from "react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, imageUrl, link }) => {
  return (
    <div className="w-[275px] m-auto text-primary border-2 border-primary cursor-pointer bg-transparent h-[375px] flex flex-col rounded-lg">
      <Link href={link} className="no-underline hover:no-underline">
        <div className="h-[275px] overflow-hidden rounded-t-lg">
          <img src={imageUrl} className="w-full h-full object-cover" alt={`${title} display image`} />
        </div>
        <div className="p-4 rounded-b-lg">
          <h3 className="text-center text-xl whitespace-pre-wrap font-medium">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
