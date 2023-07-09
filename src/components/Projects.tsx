import React from "react";
import Topnav from "./Topnav";
import ProjectsTable from "./ProjectsTable";

function Projects() {
  return (
    <>
      <div className="w-auto h-auto bg-[#fcfcfc] ">

          <div className="px-5 pt-8 w-full">
            <ProjectsTable />
          </div>
      </div>
    </>
  );
}

export default Projects;
