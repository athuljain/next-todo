"use client"

import { useEffect,useState } from "react"
import { POST } from "./api/todos/route"

export default function Home(){
    const [todos,setTodos]=useState([])
    const [newTodo,setNewTodo]=useState('')


    const fetchTodos=async ()=>{
        const res=await fetch('/api/todos')
        const data=await res.json()
        setTodos(data)
    
    
    }


    const addTodo=async()=>{
        if(!newTodo.trim())return;
        await fetch('/api/todos',{
            method:POST,
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({text:newTodo})
        })
        setNewTodo("")
        fetchTodos()
    }
useEffect(()=>{
    fetchTodos()
},[])

return (
    <main className="min-h-screen flex flex-col items-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📝 My Todo List</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo..."
          className="p-2 border rounded w-64"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 w-72">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="bg-white shadow p-3 rounded border flex justify-between items-center"
          >
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </main>
  );

}