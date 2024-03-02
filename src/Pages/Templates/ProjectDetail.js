import React, { useEffect, useState } from "react";
import { useScrollTop } from "../../Utils/NavigationUtils";
import { FaChevronLeft } from "react-icons/fa";
import { handleDownload } from "../../Utils/OnClickUtils";
import Table from "../../Components/Table";
import { Link, useLocation } from "react-router-dom";
import projects from "../../Data/Project";
import Button from "../../Components/Button";
import { HiDownload } from "react-icons/hi";
import Chart from "../../Components/Chart";

function ProjectDetail() {
  const location = useLocation();
  const { itemId } = location.state;
  const [project, setProject] = useState(null);

  useEffect(() => {
    const selectedProject = projects.find((proj) => proj.id === itemId);
    setProject(selectedProject);
    return () => {
      const canvas = document.querySelector("canvas");
      canvas?.parentNode?.removeChild(canvas);
    };
  }, [itemId]);

  useScrollTop();

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const { title, category, description, file, fileUrl } = project;

  return (
    <div className="px-8 md:px-20 lg:px-40 py-8">
      <Link
        to="/"
        className="flex items-center w-fit gap-1 text-lg font-semibold text-gray-400 md:text-xl lg:text-2xl"
      >
        <FaChevronLeft />
        Back
      </Link>
      <h1 className="text-lg md:text-xl lg:text-3xl font-bold mt-5 md:mt-7 lg:mt-10">
        {title}
      </h1>
      <p
        className="lg:text-lg text-gray-700 mt-1 md:mt-3 lg:mt-5"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="container flex justify-end mt-3">
        <Button
          className="mb-3"
          icon={<HiDownload />}
          title="Download"
          onClick={() => handleDownload(file, fileUrl)}
        >
          Download File
        </Button>
      </div>
      {category === "Data Visualization" ? (
        <Chart file={file} sheet="Table" />
      ) : (
        <Table className="overflow-x-hidden" file={file} />
      )}
    </div>
  );
}

export default ProjectDetail;
