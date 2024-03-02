import React from "react";

function ProjectCard({ imageUrl, category, title, onClick }) {
  return (
    <div onClick={onClick}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover object-center mb-2 rounded bg-black"
      />
      <p className="text-gray-500 text-sm">{category}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

export default ProjectCard;
