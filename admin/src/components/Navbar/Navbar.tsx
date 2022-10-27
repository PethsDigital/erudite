import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getNavLinks } from "../../api/config";
import "./Navbar.css";

export default function Navbar() {
  const links = getNavLinks();

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div
        className="sm:hidden p-2 font-bold text-2xl"
        onClick={() => setIsVisible(!isVisible)}
      >
        ≡
      </div>
      <div
        className={`sm:flex sm:flex-row fixed sm:relative w-full sm:w-auto right-0 bg-[#3D90EFFC] sm:bg-inherit p-2 sm:p-0 shadow-md sm:shadow-none ${
          isVisible ? "flex flex-col" : "hidden"
        }`}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-poppins text-white sm:text-[#121921FC] text-[18px] leading-[27px] mr-[27px] opacity-[99%] hover:text-black sm:hover:text-[#3D90EFFC] mb-2 sm:mb-0"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </>
  );
}
