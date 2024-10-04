import { Tasks } from "./Tasks";

export interface State {
  addTask: string;
  edTask: string;
  tasks: Tasks[];
  itemsPerPage: number;
  pages: number;
  inputTaskStore: HTMLElement | null;
}
