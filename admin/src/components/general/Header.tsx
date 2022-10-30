import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <NavLink
        to="/"
        className="text-[#3D90EFFC] text-sans text-[36px] leading-[49px] opacity-[99%]"
      >
        erudite
      </NavLink>

      <div>
        <Navbar />
      </div>
    </div>
  );
}
