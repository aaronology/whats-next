import CardList from "@/components/CardList";
import { Button } from "@/components/ui/button";
import Link from "@/node_modules/next/link";
import { Plus } from "lucide-react";
import Todo from "@/components/interfaces/Todo";

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

export default async function Home() {
  const todos = await getTodos();
  const archivedTodos = todos.filter((todo) => todo.archived);
  return (
    <main>
      <CardList cardItmArr={archivedTodos} />

      <div className="add-button absolute bottom-0 right-0 p-7">
        <Link href="/add">
          <Button className="rounded-full h-12 w-12">
            <Plus size={20} strokeWidth={3} color="white" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
