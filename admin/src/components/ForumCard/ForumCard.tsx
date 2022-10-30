import React from "react";
import { IForum } from "../../api/models";
import { profileIcon, openEyeIcon, timeIcon } from "../../assets/icons";
import "./ForumCard.css";

interface ForumCardProps {
  forum: IForum;
}

export default function ForumCard({ forum }: ForumCardProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-white mt-8 py-2 lg:py-0 hover:shadow-md">
      <div className="flex">
        <div className="p-6">
          {forum.imageUrl && (
            <img src={forum.imageUrl} alt="" className="w-[84px] h-[84px]" />
          )}
          {!forum.imageUrl && (
            <img src={profileIcon} alt="" className="w-[84px] h-[84px]" />
          )}
        </div>

        <div className="text-left">
          <h3 className="text-poppins font-medium text-2xl leading-9 text-[#4F4F4FFC]/[99%]">
            {forum.title}
          </h3>
          <span className="text-poppins text-[#4F4F4FFC]/[99%] block my-2 lg:my-0 text-base leading-6 font-medium underline lg:no-underline">
            {forum.description}
          </span>
        </div>
      </div>

      <div className="text-center lg:border-l lg:border-[#E8E8E8] flex lg:block justify-center lg:w-[121px]">
        <div className="text-white bg-cover forum-comment text-poppins text-[14px] leading-[21px] flex items-center justify-center px-[7px] py-[9px] lg:border-b border-[#E8E8E8] w-full mx-2 lg:mx-0">
          {forum.noOfComments}
        </div>

        <div className="flex items-center py-2 lg:border-b lg:border-[#E8E8E8] w-full justify-center mx-2 lg:mx-0">
          <img src={openEyeIcon} alt="" />
          <span className="text-[#3D90EF] text-poppins text-[14px] leading-[21px] pl-1">
            {forum.noOfViews}
          </span>
        </div>

        <div className="flex items-center py-2 w-full justify-center mx-2 lg:mx-0">
          <img src={timeIcon} alt="" />
          <span className="text-[#3D90EF] text-poppins text-[14px] leading-[21px] pl-[5.17px]">
            {forum.time}
          </span>
        </div>
      </div>
    </div>
  );
}
