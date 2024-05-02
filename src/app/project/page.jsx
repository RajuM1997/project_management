"use client";

import AddProject from "@/components/addProject/addProject";
import ProjectCard from "@/components/projectCard/projectCard";

const page = () => {
  return (
    <div className="main_layout">
      <div className="container">
        <AddProject />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-5 mt-14">
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default page;
