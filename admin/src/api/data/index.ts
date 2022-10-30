import forumData from "./forum.json";
import categoryData from "./categories.json";
import threadData from "./threads.json";
import topicsData from "./topics.json";

import { ICategory, IForum } from "../models";
import { IThread } from "../models/thread";
import { ITopic } from "../models/topic";

export const getForums = (): IForum[] => {
  // To get forums from server

  return forumData;
};

export const getCategories = (): ICategory[] => {
  // To get categoties from server

  return categoryData;
};

export const getThreads = (): IThread[] => {
  // To get threads from server

  return threadData;
};

export const getPopularTopics = (): ITopic[] => {
  // Get popular topics from server

  return topicsData;
};

export const getUnansweredTalks = (): IThread[] => {
  // Get unanswered talks

  return threadData;
};
