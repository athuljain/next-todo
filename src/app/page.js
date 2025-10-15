"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });
    setNewTodo("");
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center p-10 bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-6 text-red-400 drop-shadow">
        📝 My Todo List
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo..."
          className="p-2 rounded w-64 bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={addTodo}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3 w-72">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="bg-gray-800 shadow-lg p-3 rounded border border-gray-700 flex justify-between items-center hover:bg-gray-700 transition"
          >
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
