import forumData from "./forum.json";
import { Forum } from "../models/forum";

export const getForums = (): Forum[] => {
  // To get forum from server

  return forumData;
};
