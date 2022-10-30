import React from "react";
import { ITopic } from "../../../api/models/topic";
import CommentsWidget from "../../others/CommentsWidget";

interface TopicCardProps {
  topic: ITopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <div className="flex items-center justify-between px-8">
      <span className="block text-poppins font-medium leading-6 text-[#4F4F4FFC]/[99%] text-left mt-4 hover:text-[#3D90EFFC]/[99%] underline lg:no-underline">
        {topic.title}
      </span>

      <CommentsWidget content={topic.comments.length} />
    </div>
  );
}
