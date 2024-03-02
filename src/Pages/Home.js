import React from "react";
import Button from "../Components/Button";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import ProjectCard from "../Components/ProjectCard";
import { useNavigation } from "../Utils/NavigationUtils";
import projects from "../Data/Project";
import { handleContactEmail, handleDownload } from "../Utils/OnClickUtils";
import experiences from "../Data/Experience";
import Experience from "../Components/Experience";

function Home() {
  const { handleItemClick } = useNavigation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:px-36">
      {/* Left Section */}
      <div className="md:col-span-1 bg-white p-8 flex flex-col md:h-svh items-center md:sticky top-0 justify-center">
        <div className="mb-4">
          <img
            className="w-40 h-40 md:w-28 md:h-28 rounded-full object-cover object-top"
            src="/Images/Profile.png"
            alt="Avatar"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">Rizqi Shoqibul Atzmi</h1>
        <div className="mb-4 flex items-baseline justify-center">
          <FaMapMarkerAlt className="text-gray-600 mr-2 text-sm" />
          <p className="inline-block text-gray-600 mb-1">Malang, Indonesia</p>
        </div>
        <Button
          icon={<FaEnvelope />}
          title="Contact"
          onClick={() => handleContactEmail()}
        />
        <Button
          icon={<HiDownload />}
          title="Download CV"
          onClick={() =>
            handleDownload(
              "CV-Shoqibul-DataEntry.pdf",
              "/Docs/CV-Shoqibul-Data%20Entry.pdf"
            )
          }
          type="secondary"
        />
      </div>

      {/* Right Section */}
      <div className="md:col-span-2 bg-white p-8 overflow-y-auto py-10">
        <h1 className="text-3xl font-bold mb-4">
          Data Entry, Virtual Assistant, Data Analyst
        </h1>
        <h3 className="text-base mb-4">
          <span className="font-semibold">Technical Skills:</span> Data Entry,
          Data Extraction, Data Collection, Data Visualization, Lead Generation,
          SQL
        </h3>
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        {/* Experience List */}
        {experiences.map((item, index) => (
          <Experience key={index} title={item.title} impact={item.impact} />
        ))}
        <h2 className="text-2xl font-bold mt-4 mb-4">Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Project List */}
          {projects.map((item) => (
            <ProjectCard
              key={item.id}
              imageUrl={item.imageUrl}
              category={item.category}
              title={item.title}
              onClick={() => handleItemClick(item.id, item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
