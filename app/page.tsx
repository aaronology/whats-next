import CardList from "@/components/CardList";
import { Button } from "@/components/ui/button";
import Link from "@/node_modules/next/link";
import { Plus } from "lucide-react";
import { Todo } from "@/components/interfaces/Todo";

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/todos/records`
  );
  const data = await res.json();
  return data?.items;
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <main>
      <CardList cardItmArr={todos} />

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
