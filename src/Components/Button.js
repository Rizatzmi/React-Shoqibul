import React from "react";

function Button({ icon, title, onClick, type }) {
  return (
    <>
      {type === "secondary" ? (
        <p
          className="text-black flex items-center hover:underline hover:underline-offset-4"
          onClick={onClick}
        >
          {icon}
          {title}
        </p>
      ) : (
        <button
          className="flex items-center bg-black text-white py-2 px-5 gap-2 rounded-sm mb-3"
          onClick={onClick}
        >
          {icon}
          {title}
        </button>
      )}
    </>
  );
}

export default Button;
