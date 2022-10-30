import React from "react";
import SectionHeader from "../../components/general/SectionHeader";
import { getForums } from "../../api/data";
import { ForumCard } from "../../components";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <React.Fragment>
      <SectionHeader heading="Erudite Forum" />
      {getForums().map((forum) => (
        <NavLink to={"" + forum.id} key={forum.id}>
          <ForumCard forum={forum} />
        </NavLink>
      ))}
    </React.Fragment>
  );
}
