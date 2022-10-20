import React from "react";
import "./AuthLayout.css";
import { NavLink } from "react-router-dom";

export default function AuthLayout({
  AuthElement,
  heading,
  text,
  handleClick,
  buttonText,
}: {
  AuthElement: JSX.Element;

  heading: string;
  text: string;
  buttonText: string;
  handleClick: any;
}) {
  return (
    <div className="flex flex-col sm:flex-row max-w-[1440px] mx-auto shadow-lg">
      <div className="h-full sm:w-1/2 lg:w-7/12 lg:pl-[100px] lg:pr-[50px] mb-10 sm:mb-0">
        <h1 className="logo text-center lg:text-left text-4xl opacity-[99%] mt-8 text-[#3D90EFFC]">
          <NavLink to={"/"}>Erudite</NavLink>
        </h1>
        {AuthElement}
      </div>

      <div className="auth-right relative flex items-center justify-center sm:w-1/2 lg:w-5/12 min-h-screen">
        <div className="h-full bg-[#3D90EFFC] opacity-50 absolute w-full rounded-l-[15px]"></div>

        <div className="z-20 max-w-[519px] mx-auto">
          <h3 className="font-bold text-[50px] leading-[75px] text-white mb-10">
            {heading}
          </h3>

          <span className="text-white font-semibold text-2xl leading-9 text-center block mb-[49px]">
            {text}
          </span>

          <div className="text-center">
            <button
              onClick={handleClick}
              className="text-white bg-transparent border border-white hover:bg-white hover:text-[#3D90EFFC] hover:opacity-[99%] rounded-[15px] px-[63px] py-[9px]"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
