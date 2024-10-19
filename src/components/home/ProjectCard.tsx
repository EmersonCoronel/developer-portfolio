import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, imageUrl, link }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link href={link} className="card-link">
        <div className="card">
          <div className="card-image-container">
            <img
              src={imageUrl}
              className="card-img-top"
              alt={title + "display image"}
            />
          </div>
          <div className="card-body">
            <h3 className="card-title">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
