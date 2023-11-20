import prisma from "@/db";
import Link from "next/link";
import { TodoItem } from "../components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  // console.log(id, complete);

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  // const newTodo = await prisma.todo.create({
  //   data: { title: "test", complete: false },
  // });

  // const deleteAllTodo = await prisma.todo.deleteMany();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href={"/new"}
          className="border border-slate-300 text-slate-300 p-2 rounded hover:bg-slate-700"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} toggleTodo={toggleTodo} {...todo} />;
        })}
      </ul>
    </>
  );
}
