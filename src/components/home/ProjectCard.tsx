import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, imageUrl, link }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link to={link} className="card-link">
        <div className="card">
          <div className="card-image-container">
            <img src={imageUrl} className="card-img-top" alt={title} />
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
