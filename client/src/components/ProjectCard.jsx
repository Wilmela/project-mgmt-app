import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, name, status }) => {

  return (
    <div className="col-md-6" data-aos='fade-up'>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{name}</h5>
            <Link to={`/projects/${id}`} className='btn btn-light'>View</Link>
          </div>
          <p className="small">Status: <strong>{status}</strong></p>

        </div>
      </div>
      
    </div>
  );
};

export default ProjectCard;
