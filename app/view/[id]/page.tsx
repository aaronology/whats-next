import { Todo } from "@/components/interfaces/Todo";
import { Button } from "@/components/ui/button";
import Link from "@/node_modules/next/link";
import { Pencil } from "lucide-react";
import { getRelativeTimeString } from "@/components/getRelativeTimeString";
import { Badge } from "@/components/ui/badge";

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    `https://whatsnext.pockethost.io/api/collections/todos/records`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.items;
}

const ViewCard = async ({ params }) => {
  const id = params.id;
  const todos = await getTodos();
  // Filtering out the required todo by ID
  const todo: Todo = todos.filter((todo) => todo.id === id)[0];
  console.log(todo);
  return (
    <main>
      <h1 className="text-4xl py-3">{todo.title}</h1>
      <Badge variant="outline" className="text-sm">
        Due: {getRelativeTimeString(todo.due)}
      </Badge>
      <Badge
        className={`text-sm ${
          todo.priority == "low"
            ? "bg-lime-400"
            : todo.priority == "medium"
            ? "bg-amber-400"
            : "bg-orange-400"
        }`}
      >
        {todo.priority} priority
      </Badge>

      <article className="my-8 text-lg">{todo.description}</article>

      <div className="edit-button fixed bottom-0 right-0 p-7">
        <Link href={`/edit/${id}`}>
          <Button className="rounded-full h-12 w-12">
            <Pencil size={20} strokeWidth={3} color="white" />
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default ViewCard;
