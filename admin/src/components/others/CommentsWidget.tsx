import React from "react";
import { chatIcon } from "../../assets/icons";

interface CommentWidgetProps {
  content: string | number;
}

export default function CommentsWidget({ content }: CommentWidgetProps) {
  return (
    <div className="flex items-center">
      <img src={chatIcon} alt="" className="mr-3" />

      <span className="text-poppins text-sm text-[#4F4F4FFC]/[99%] leading-[21px]">
        {content}
      </span>
    </div>
  );
}
