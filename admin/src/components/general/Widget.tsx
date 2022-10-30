import React, { useState } from "react";
import {
  ActiveThreadWidget,
  CategoryWidget,
  PopularTopicsWidget,
  UnansweredTalksWidget,
} from "../sidebar";

export default function Widget() {
  // Shows widgets based on if user is logged in or not

  const [isLoggedIn] = useState(true); //TODO: set to real login state tracker

  if (isLoggedIn) {
    // Show category and active thread widget
    return (
      <React.Fragment>
        <div className="mb-[73px] pt-4 pb-[14px] bg-white w-full">
          <CategoryWidget />
        </div>

        <div className="mb-[73px] pt-4 pb-[14px] bg-white w-full">
          <ActiveThreadWidget />
        </div>
      </React.Fragment>
    );
  } else {
    // Show popular topics and unanswered talks widget
    return (
      <React.Fragment>
        <div className="mb-[73px] pt-4 pb-[14px] bg-white w-full">
          <PopularTopicsWidget />
        </div>

        <div className="mb-[73px] pt-4 pb-[14px] bg-white w-full">
          <UnansweredTalksWidget />
        </div>
      </React.Fragment>
    );
  }
}
