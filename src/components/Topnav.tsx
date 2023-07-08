import React from 'react'
import { Avatar } from "@material-tailwind/react";
import iconImage from "../assets/img_avatar.png";

function Topnav() {
  return (
    <div className='py-4 px-4 justify-end w-auto flex border-b-2 border-[#DFDBD8]'>
         <Avatar src={iconImage} alt="avatar" size="sm" />
    </div>
  )
}

export default Topnav