import React from "react";
import { SidenavData } from "./SidenavData";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import iconImage from "../assets/icon bcs.png"; // Import the image file

import { useState } from "react";

import {
  FaUsers,
  FaUserTag,
  FaHome,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";

function Sidenav() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="h-screen w-[15rem] shadow-xl shadow-blue-gray-900/5 bg-[#111827]">
        <div className="p-4 pb-2">
          <img className="w-[2rem]" src={iconImage} alt="" />{" "}
          {/* Use the imported image */}
        </div>
        <List>
          <Link
            className={`pl-6 text-[#6E8BA5] py-2 item ${
              location.pathname === "/" ? "active" : ""
            }`}
            to="/"
          >
            <ListItemPrefix className="icon">
              <FaHome />
            </ListItemPrefix>
            <span>Inicio</span>
          </Link>

          <div className="relative">
            <div
              className={`pl-6 text-[#6E8BA5] py-2 item`}
              onClick={toggleDropdown}
            >
              <ListItemPrefix className="icon">
                <FaUsers />
              </ListItemPrefix>
              <span className="flex flex-row justify-between w-full pr-6 cursor-pointer">
                Tareas
                <div className="flex mt-1">
                  {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              </span>
            </div>
            {dropdownOpen && (
              <div className="block bg-[#111827] left-0 top-[calc(100%+0.5rem)] py-2 rounded">
                <Link
                  className={`text-[#6E8BA5] py-2 block pl-[3.5rem] ${
                    location.pathname === "/programadas" ? "active" : ""
                  }`}
                  to="/programadas"
                >
                  Programadas
                </Link>
                <Link
                  className={`text-[#6E8BA5] py-2 block pl-[3.5rem] ${
                    location.pathname === "/projects" ? "active" : ""
                  }`}
                  to="/projects"
                >
                  Rutinarias
                </Link>
                <Link
                  className={`text-[#6E8BA5] py-2 block pl-[3.5rem] ${
                    location.pathname === "/no-rutinarias" ? "active" : ""
                  }`}
                  to="/no-rutinarias"
                >
                  No Rutinarias
                </Link>
              </div>
            )}
          </div>

          <Link
            className={`pl-6 text-[#6E8BA5] py-2 item ${
              location.pathname === "/roles" ? "active" : ""
            }`}
            to="/roles"
          >
            <ListItemPrefix className="icon">
              <FaUserTag />
            </ListItemPrefix>
            <span>Roles</span>
          </Link>

          <Link
            className={`pl-6 text-[#6E8BA5] py-2 item ${
              location.pathname === "/demanda" ? "active" : ""
            }`}
            to="/demanda"
          >
            <ListItemPrefix className="icon">
              <FaUserTag />
            </ListItemPrefix>
            <span>Demanda</span>
          </Link>
        </List>
      </div>
    </>
  );
}

export default Sidenav;
