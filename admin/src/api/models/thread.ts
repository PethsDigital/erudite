export interface IThread {
  id: number;
  author: {
    name: string;
    image: string;
  };
  time: string;
  content: string;
  comments: string[] | number[];
}
