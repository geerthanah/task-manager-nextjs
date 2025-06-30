"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Priority = "Low" | "Medium" | "High";
type StatusFilter = "All" | "Completed" | "Pending";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string; // ISO date string
}

const priorityOrder: Priority[] = ["High", "Medium", "Low"];

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [sortByDueDate, setSortByDueDate] = useState(false);
  const [error, setError] = useState("");

  // Load tasks & dark mode from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme === "true") setDarkMode(true);
    }
  }, []);

  // Save tasks & dark mode changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("darkMode", darkMode.toString());
    }
  }, [tasks, darkMode]);

  // Toggle dark mode class on html
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const addTask = () => {
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    if (!dueDate) {
      setError("Please select a due date");
      return;
    }
    setError("");
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setPriority("Medium");
    setDueDate("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filter tasks by status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    return !task.completed;
  });

  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortByPriority) {
      // Priority descending (High first)
      const prioDiff =
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      if (prioDiff !== 0) return prioDiff;
    }
    if (sortByDueDate) {
      // Due date ascending (soonest first)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
          Super Task Manager
        </h1>
      
      </div>

      {/* Add Task Form */}
      <section className="max-w-4xl mx-auto mt-20 p-16 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700">
  <h2 className="text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
    Add New Task
  </h2>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      addTask();
    }}
    className="space-y-10"
  >
    <div>
      <label
        htmlFor="title"
        className="block mb-4 text-xl font-semibold text-gray-800 dark:text-gray-300"
      >
        Task Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="w-full rounded-xl border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 text-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
        required
      />
    </div>

    <div>
      <label
        htmlFor="priority"
        className="block mb-4 text-xl font-semibold text-gray-800 dark:text-gray-300"
      >
        Priority
      </label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full rounded-xl border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 text-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
      >
        <option value="High">🔥 High Priority</option>
        <option value="Medium">⚡ Medium Priority</option>
        <option value="Low">🌿 Low Priority</option>
      </select>
    </div>

    <div>
      <label
        htmlFor="dueDate"
        className="block mb-4 text-xl font-semibold text-gray-800 dark:text-gray-300"
      >
        Due Date
      </label>
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        className="w-full rounded-xl border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 text-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-6 rounded-2xl shadow-xl text-3xl transition"
    >
      Add Task
    </button>

    {error && (
      <p className="text-center text-red-700 font-semibold mt-6 text-xl">{error}</p>
    )}
  </form>
</section>

      {/* Filters & Sorting */}
      <section className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 items-center text-gray-700 dark:text-gray-300">
          <span>Filter:</span>
          {(["All", "Completed", "Pending"] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md font-semibold ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
              } transition`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-4 items-center text-gray-700 dark:text-gray-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sortByPriority}
              onChange={(e) => setSortByPriority(e.target.checked)}
              className="cursor-pointer"
            />
            Sort by Priority
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sortByDueDate}
              onChange={(e) => setSortByDueDate(e.target.checked)}
              className="cursor-pointer"
            />
            Sort by Due Date
          </label>
        </div>
      </section>

      {/* Task Table */}
      <section className="overflow-x-auto flex-grow">
        {sortedTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 italic">
            No tasks found. Add some tasks!
          </p>
        ) : (
          <table className="w-full border-collapse table-auto text-gray-900 dark:text-gray-200">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900 text-left">
                <th className="p-3 border border-gray-300 dark:border-gray-700">
                  #
                </th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">
                  Title
                </th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">
                  Priority
                </th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">
                  Due Date
                </th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">
                  Status
                </th>
                <th className="p-3 border border-gray-300 dark:border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, i) => {
                const isOverdue =
                  !task.completed && new Date(task.dueDate) < new Date();
                return (
                  <tr
                    key={task.id}
                    className={`${
                      i % 2 === 0
                        ? "bg-white dark:bg-gray-700"
                        : "bg-gray-50 dark:bg-gray-800"
                    } hover:bg-blue-50 dark:hover:bg-blue-800 transition`}
                  >
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {i + 1}
                    </td>
                    <td
                      className={`p-3 border border-gray-300 dark:border-gray-700 ${
                        task.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : ""
                      }`}
                    >
                      {task.title}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700 font-semibold">
                      <span
                        className={
                          task.priority === "High"
                            ? "text-red-600 dark:text-red-400"
                            : task.priority === "Medium"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                        }
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td
                      className={`p-3 border border-gray-300 dark:border-gray-700 ${
                        isOverdue
                          ? "text-red-600 dark:text-red-400 font-bold"
                          : ""
                      }`}
                    >
                      {new Date(task.dueDate).toLocaleDateString()}
                      {isOverdue ? " (Overdue)" : ""}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {task.completed ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          Completed
                        </span>
                      ) : (
                        <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700 flex gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        aria-label="Toggle completion"
                        title="Toggle completion"
                      >
                        {task.completed ? "↺ Undo" : "✓ Done"}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 dark:text-red-400 hover:underline font-semibold"
                        aria-label="Delete task"
                        title="Delete task"
                      >
                        ✗ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
