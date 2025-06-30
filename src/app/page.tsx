"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { loadTasks, saveTasks } from "@/utils/storage";
import TaskItem from "@/components/TaskItem";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (title.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }
    setError("");
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Task</h2>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Add Task
        </button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <h3 className="text-lg font-semibold mb-3">Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks yet. Add some above!</p>
      ) : (
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Task</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr
                key={task.id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 border border-gray-300">{i + 1}</td>
                <td
                  className={`p-3 border border-gray-300 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </td>
                <td className="p-3 border border-gray-300">
                  {task.completed ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-3 border border-gray-300 flex gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                    aria-label="Toggle completion"
                    title="Toggle completion"
                  >
                    {task.completed ? "↺ Undo" : "✓ Done"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    aria-label="Delete task"
                    title="Delete task"
                  >
                    ✗ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
