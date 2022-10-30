import React from "react";
import { IThread } from "../../api/models/thread";
import { profileIcon } from "../../assets/icons";
import { CommentsWidget } from "../others";

interface ThreadCardProps {
  thread: IThread;
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <div className="flex flex-col px-8 mt-6 text-[#4F4F4FFC]/[99%] hover:text-[#3D90EFFC]/[99%]">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-2">
          {thread.author.image && (
            <img src={thread.author.image} alt="" className="w-full h-full" />
          )}
          {!thread.author.image && (
            <img src={profileIcon} alt="" className="w-full h-full" />
          )}
        </div>

        <span className="text-poppins block font-semibold text-sm leading-[21px] text-[#121921FC]/[99%]">
          {thread.author.name}
        </span>

        <span className="text-poppins text-xs leading-[18px] pl-[7px]">
          {thread.time}
        </span>
      </div>

      <div className="text-poppins font-medium leading-6 text-left my-2 underline lg:no-underline">
        {thread.content}
      </div>

      <div>
        <CommentsWidget
          content={`${thread.comments.length} ${
            thread.comments.length ? "Comments" : "Comment"
          }`}
        />
      </div>
    </div>
  );
}
