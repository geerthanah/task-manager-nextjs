"use client";
import { Task } from "@/types/task";

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
}: {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <span
        className={`flex-grow ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => toggleTask(task.id)}
          className="text-green-600 hover:underline"
        >
          ✅
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-600 hover:underline"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
