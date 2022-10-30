import React, { useState } from "react";
import { profileIcon } from "../../assets/icons";
import { IForum } from "../../api/models/forum";

export default function Single() {
  const [forum] = useState<IForum>();

  return (
    <div className="text-[#4F4F4FFC]/[99%] text-poppins">
      <div className="flex text-[#3D90EFFC]/[99%] text-poppins font-semibold text-[28px] leading-[42px]">
        <h2 className="pr-1">FORUM TITLE</h2>
        <span> &gt; </span>
        <h3 className="pl-1">TOPIC TITLE</h3>
      </div>

      <div className="flex flex-col">
        <div className="flex">
          <div className="w-[86px]">
            <div className="w-[70px] h-[70px] mr-4">
              {forum && forum.imageUrl && (
                <img src={forum.imageUrl} alt="" className="w-full h-full" />
              )}
              {((forum && !forum.imageUrl) || !forum) && (
                <img src={profileIcon} alt="" className="w-full h-full" />
              )}
            </div>
          </div>

          <div className="">
            <div className="text-left mb-2">
              <span className="font-semibold text-lg leading-[27px] text-[#121921FC]/[99%]">
                John white
              </span>
              <span className="leading-6 text-[#4F4F4FFC]/[99%] pl-[14px]">
                3 hours ago
              </span>
            </div>

            <p className="text-left font-medium text-lg leading-[27px]">
              What is SH5 lacking in the traditional sense of a novel, in terms
              of structure or otherwise? In that light, why might it be
              considered such a successful and innovative book? Do you think
              this is a work that will be read in a hundred years? In five
              hundred? Why or why not?
            </p>

            <div className="flex mt-2">
              <button className="mr-2 cursor-pointer">Edit</button>
              <button className="mr-2 cursor-pointer">Like</button>

              <span>20 Likes</span>
            </div>
          </div>
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
}
