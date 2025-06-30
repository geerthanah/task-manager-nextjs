import { Task } from "@/types/task";

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
