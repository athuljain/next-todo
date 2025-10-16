"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // ✅ Fetch all todos
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  // ✅ Add a new todo
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

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  // ✅ Update (edit) todo
  const updateTodo = async (id) => {
    if (!editingText.trim()) return;
    await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: editingText }),
    });
    setEditingId(null);
    setEditingText("");
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

      {/* ✅ Input Box */}
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

      {/* ✅ Todo List */}
      <ul className="space-y-3 w-72">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="bg-gray-800 shadow-lg p-3 rounded border border-gray-700 flex justify-between items-center hover:bg-gray-700 transition"
          >
            {editingId === todo._id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="bg-gray-700 text-white p-1 rounded w-40"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTodo(todo._id)}
                    className="text-green-400 hover:text-green-500"
                  >
                    ✅ Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(todo._id);
                      setEditingText(todo.text);
                    }}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}