import React from "react";
import { SidenavData } from "./SidenavData";
import { Link, useLocation } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import iconImage from "../assets/icon bcs.png"; // Import the image file

const Sidenav: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <>
      <div className="h-screen w-[15rem] shadow-xl shadow-blue-gray-900/5 bg-[#111827]">
        <div className="p-4 pb-2">
          <img className="w-[2rem]" src={iconImage} alt="" /> {/* Use the imported image */}
        </div>
        <List>
          {SidenavData.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                className={`pl-6 text-[#6E8BA5] py-2 item ${
                  isActive ? "active" : ""
                }`}
                to={item.path}
              >
                <ListItemPrefix className="icon">{item.icon}</ListItemPrefix>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default Sidenav;
