import React, { useEffect, useState } from "react";
import WidgetLayout from "../WidgetLayout";
import { IThread } from "../../../api/models/thread";
import { getThreads } from "../../../api/data";
import ThreadCard from "../ThreadCard";
import { NavLink } from "react-router-dom";

export default function ActiveThreadWidget() {
  const [threads, setThreads] = useState<IThread[]>([]);

  useEffect(() => {
    const threads = getThreads();

    setThreads(threads);
  }, []);

  const View = (): JSX.Element => (
    <React.Fragment>
      {/* Show only two of the latest threads */}
      {threads.slice(0, 2).map((thread) => (
        <NavLink key={thread.id} to={"" + thread.id}>
          <ThreadCard thread={thread} />
        </NavLink>
      ))}
    </React.Fragment>
  );

  return (
    // <div>
    //   <WidgetHeading title="My Active Thread" />
    // </div>
    <WidgetLayout title="My Active Thread" View={View} />
  );
}
