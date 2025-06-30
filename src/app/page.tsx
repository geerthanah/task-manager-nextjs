"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { loadTasks, saveTasks } from "@/utils/storage";
import TaskItem from "@/components/TaskItem";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (title.trim() === "") return;
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">📝 Task Manager</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-grow rounded"
          placeholder="Enter new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </main>
  );
}
