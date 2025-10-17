"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // ✅ Fetch todos
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  // ✅ Add todo
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

  // ✅ Update todo
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black text-gray-100 p-8">
      {/* Title */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-5xl font-extrabold mb-10 text-red-400 drop-shadow-lg tracking-wide"
      >
        📝 My Todo List
      </motion.h1>

      {/* Input Box */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 mb-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-red-500/20"
      >
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo..."
          className="p-2 rounded-lg w-64 bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={addTodo}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-transform hover:scale-105"
        >
          ➕ Add
        </button>
      </motion.div>

      {/* Todo List */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 w-80"
      >
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo._id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md shadow-lg p-4 rounded-xl border border-gray-700 flex justify-between items-center hover:shadow-red-400/40 hover:scale-[1.02] transition-transform"
            >
              {editingId === todo._id ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded w-40 focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateTodo(todo._id)}
                      className="text-green-400 hover:text-green-500"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      ❌
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-lg">{todo.text}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditingText(todo.text);
                      }}
                      className="text-yellow-400 hover:text-yellow-500 transition-transform hover:scale-110"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-400 hover:text-red-500 transition-transform hover:scale-110"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </main>
  );
}
