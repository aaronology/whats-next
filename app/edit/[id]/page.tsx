import FormBuilder from "@/components/FormBuilder";
import { Todo } from "@/components/interfaces/Todo";

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/todos/records`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.items;
}

const Edit = async ({ params }) => {
  const id = params.id;
  const todos = await getTodos();
  // Filtering out the required todo by ID
  const todo: Todo = todos.filter((todo) => todo.id === id)[0];
  const defaultValues = {
    title: todo.title,
    description: todo.description,
    due: new Date(todo.due),
    archived: todo.archived,
    priority: todo.priority,
  };
  return (
    <FormBuilder isNewEntry={false} defaultValues={defaultValues} id={id} />
  );
};

export default Edit;
