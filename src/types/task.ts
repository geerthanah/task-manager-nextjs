export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
}
