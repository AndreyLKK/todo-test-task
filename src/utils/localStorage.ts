import { Tasks } from "@/types/Tasks";

export const setLocalStorage = (nameStorage: string, item: Tasks[]) => {
  localStorage.setItem(nameStorage, JSON.stringify(item));
};

export const getLocalStorage = (nameStorage: string) => {
  const getLocalStorage: string | null = localStorage.getItem(nameStorage);
  if (!getLocalStorage) return;
  return JSON.parse(getLocalStorage);
};
