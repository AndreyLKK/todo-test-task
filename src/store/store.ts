import { defineStore } from "pinia";
import { setLocalStorage } from "@/utils/localStorage";
import type { Tasks } from "@/types/Tasks";
import type { State } from "@/types/StoreState";

export const useMyStore = defineStore("myStore", {
  state: (): State => ({
    addTask: "",
    edTask: "",
    tasks: [] as Tasks[],
    itemsPerPage: 4,
    pages: 0,
    inputTaskStore: null,
  }),
  actions: {
    handlerAddTask() {
      if (!this.addTask) return;
      if (!Array.isArray(this.tasks)) this.tasks = [];
      
      this.tasks.unshift({
        title: this.addTask,
        completed: false,
        editing: false,
      });
      setLocalStorage("tasks", this.tasks);
      this.addTask = "";
    },

    currentTasks() {
      if (!Array.isArray(this.tasks)) return [];
      const start = this.pages * this.itemsPerPage;
      return this.tasks.slice(start, start + this.itemsPerPage);
    },

    totalPages() {
      if (!Array.isArray(this.tasks)) return 0;
      return Math.ceil(this.tasks.length / this.itemsPerPage);
    },

    handlerPagination(page: number) {
      this.pages = page;
    },

    removeTask(idx: number) {
      this.tasks.splice(idx + this.pages * this.itemsPerPage, 1);
      return setLocalStorage("tasks", this.tasks);
    },

    doneTask(idx: number) {
      this.tasks[idx].completed = !this.tasks[idx].completed;
      setLocalStorage("tasks", this.tasks);
    },

    edditingTask(idx: number) {
      const realIndex = idx + this.pages * this.itemsPerPage;
      if (!this.tasks[realIndex].editing) {
        this.tasks.map((el) => (el.editing ? (el.editing = false) : el));
        this.edTask = this.tasks[realIndex].title;
      }

      if (
        this.edTask !== this.tasks[realIndex].title &&
        this.tasks[realIndex].editing
      ) {
        this.tasks[realIndex].title = this.edTask;
      }

      this.tasks[realIndex].editing = !this.tasks[realIndex].editing;
      setLocalStorage("tasks", this.tasks);
    },
  },
});
