import React, { useEffect, useState } from "react";
import WidgetLayout from "../WidgetLayout";
import { ITopic } from "../../../api/models";
import { getPopularTopics } from "../../../api/data";
import TopicCard from "./TopicCard";
import { NavLink } from "react-router-dom";

export default function PopularTopicsWidget() {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    const topics = getPopularTopics();

    setTopics(topics);
  }, []);

  const View = (): JSX.Element => (
    <React.Fragment>
      {topics.slice(0, 4).map((topic) => (
        <NavLink to={`../topic/${topic.id}`} key={topic.id}>
          <TopicCard topic={topic} />
        </NavLink>
      ))}
    </React.Fragment>
  );

  return <WidgetLayout title="Popular Topics" View={View} />;
}
