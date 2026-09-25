import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import client from "../api/apollo";
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../api/operations";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
};

type GetTodosData = {
  todos: Todo[];
};

type CreateTodoData = {
  createTodo: Todo;
};

type UpdateTodoData = {
  updateTodo: Todo;
};

type DeleteTodoData = {
  deleteTodo: boolean;
};

type TodoScreenProps = {
  onLogout: () => void;
};

export default function TodoScreen({ onLogout }: TodoScreenProps) {
  const [newTodo, setNewTodo] = useState("");

  const { data, loading, refetch } =
    useQuery<GetTodosData>(GET_TODOS);

  const [createTodo, { loading: creating }] =
    useMutation<CreateTodoData>(CREATE_TODO);

  const [updateTodo] =
    useMutation<UpdateTodoData>(UPDATE_TODO);

  const [deleteTodo] =
    useMutation<DeleteTodoData>(DELETE_TODO);

  const todos: Todo[] = data?.todos ?? [];

  const handleCreate = async () => {
    const title = newTodo.trim();

    if (!title) {
      return;
    }

    try {
      await createTodo({
        variables: { title },
      });

      setNewTodo("");
      await refetch();
    } catch {
      alert("Could not create todo.");
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await updateTodo({
        variables: {
          id: todo.id,
          completed: !todo.completed,
        },
      });

      await refetch();
    } catch {
      alert("Could not update todo.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({
        variables: { id },
      });

      await refetch();
    } catch {
      alert("Could not delete todo.");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    await client.clearStore();

    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-5">
      <div className="mx-auto w-full max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Todos
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {todos.length}{" "}
              {todos.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          <button
  onClick={handleLogout}
  title="Logout"
  aria-label="Logout"
  className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 17l5-5-5-5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12H3"
    />
  </svg>
</button>
        </div>

        {/* Add Todo */}
        <div className="mb-5 flex gap-2.5">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreate();
              }
            }}
            className="h-[52px] min-w-0 flex-1 rounded-[10px] border border-slate-200 bg-white px-[15px] text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[10px] bg-gray-900 text-2xl font-light text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "+"
            )}
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-gray-900" />

            <p className="mt-3 text-sm text-slate-500">
              Loading your todos...
            </p>
          </div>
        ) : todos.length === 0 ? (

          /* Empty State */
          <div className="flex min-h-[400px] flex-col items-center justify-center">
            <div className="mb-3 text-4xl">✓</div>

            <h2 className="text-xl font-semibold text-slate-700">
              No todos yet
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Add your first task above.
            </p>
          </div>

        ) : (

          /* Todo List */
          <div className="space-y-2.5">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center rounded-xl bg-white p-[15px]"
              >
                {/* Todo Main */}
                <button
                  onClick={() => handleToggle(todo)}
                  className="flex min-w-0 flex-1 items-center text-left"
                >
                  {/* Checkbox */}
                  <span
                    className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                      todo.completed
                        ? "border-gray-900 bg-gray-900"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {todo.completed && (
                      <span className="text-sm font-bold text-white">
                        ✓
                      </span>
                    )}
                  </span>

                  {/* Title */}
                  <span
                    className={`min-w-0 flex-1 text-base ${
                      todo.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                </button>

                {/* Delete */}
                 <button
  onClick={() => handleDelete(todo.id)}
  title="Delete todo"
  aria-label="Delete todo"
  className="ml-2 rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 6h18"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 6V4h8v2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 6l-1 14H6L5 6"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 11v5M14 11v5"
    />
  </svg>
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}