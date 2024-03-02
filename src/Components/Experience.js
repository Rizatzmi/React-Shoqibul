import React from "react";

function Experience({ title, impact }) {
  return (
    <div className="mb-3">
      <h1 className="font-semibold mb-2">{title}</h1>
      <ul className="ml-6 list-disc">
        {Array.isArray(impact) ? (
          impact.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>{impact}</li>
        )}
      </ul>
    </div>
  );
}

export default Experience;
