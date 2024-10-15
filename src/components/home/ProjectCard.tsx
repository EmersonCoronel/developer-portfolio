import React from "react";
import Link from "next/link";
import Image from "next/image"

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
            <Image src={imageUrl} className="card-img-top" alt={title} width={100} height={200} priority/>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
