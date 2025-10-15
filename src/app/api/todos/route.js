// import { connectDB } from "../../lib/mongodb";
// import Todo from "../../models/Todo";

// import { NextResponse } from "next/server";

// export async function GET(){
//     await connectDB()
//     const todos=await Todo.find();
//     return NextResponse.json(todos)
// }

// export async function POST(){
//     await connectDB()
//    const {text}=await req.json()
//    const newTodo=await Todo.create({text})
//    return NextResponse.json(newTodo)
// }



import { connectDB } from "../../lib/mongodb";
import Todo from "../../models/Todo"; 
import { NextResponse } from "next/server";

// ✅ GET: Fetch all todos
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find();
    return NextResponse.json(todos);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

// ✅ POST: Add a new todo
export async function POST(req) {
  try {
    await connectDB();
    const { text } = await req.json();
    const newTodo = await Todo.create({ text });
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
