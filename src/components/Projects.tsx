import React from "react";
import Topnav from "./Topnav";
import ProjectsTable from "./ProjectsTable";

function Projects() {
  return (
    <>
      <div className="w-auto h-screen bg-[#f2f2f2] ">

        <div>
          <div className="px-5 pt-8">
            <ProjectsTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
