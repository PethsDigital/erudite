import React, { useEffect, useState } from "react";
import { WidgetHeading } from "..";
import { IThread } from "../../api/models/thread";
import { getUnansweredTalks } from "../../api/data/index";
import ThreadCard from "./ThreadCard";
import { NavLink } from "react-router-dom";

export default function UnansweredTalksWidget() {
  const [talks, setTalks] = useState<IThread[]>([]);

  useEffect(() => {
    const talks = getUnansweredTalks();

    setTalks(talks);
  }, []);

  return (
    <div>
      <WidgetHeading title="Unanswered Talks" />

      <span className="block my-2 text-poppins text-sm text-left px-8 leading-[21px] text-[#4F4F4FFC]/[99%]">
        These questions have not been answered by any member of the forum
      </span>

      <div>
        {talks.slice(0, 2).map((talk) => (
          <NavLink key={talk.id} to={`../topic/${talk.id}`}>
            <ThreadCard thread={talk} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
