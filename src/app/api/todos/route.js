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


export async function PATCH(req){
  try{
    await connectDB()
    const {id,text,completed}=await req.json()

    const updatedTodo=await Todo.findByIdAndUpdate(
      id,
      {
        ...(text && {text}),...(complted !== undefined && {completed})
      },
      {new:true}
    );

    if(!updatedTodo)
      return NextResponse.json({error:"TODO not found"},{status:404})
    return NextResponse.json(updatedTodo)


  }catch(error){
    console.error("PATCH error",error)
    return NextResponse.json({error:"failed to update todo"},{status:500})
  }
}



export async function DELETE(req){
  try{
    await connectDB()
    const {id}=await req.json()

        if (!id)
      return NextResponse.json({ error: "Missing todo ID" }, { status: 400 });

    const deleteTodo=await Todo.findByIdAndDelete(id)
    if(!deleteTodo)
      return NextResponse.json({error:"todo not found"},{status:404})
    return NextResponse.json({message:"Todo deleted successfully"})
  }catch(error){
    console.error("Delete error:",error)
    return NextResponse.json({error:"failed to delete tot"},{status:500})
  }
}