import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type TodoProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<
      "timer" | "timetracker" | "flashcards" | "timer" | null | "todo"
    >
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
  isLoggedIn: boolean;
};

type TodoItemType = {
  userid: string;
  text: string;
  is_done: boolean;
  _id: string;
};

export default function Todo({
  selectedTool,
  setSelectedTool,
  isLoggedIn,
}: TodoProps) {
  const [todoItemsList, setTodoItemsList] = useState<TodoItemType[] | null>([]);

  const [newTodoState, setNewTodoState] = useState<string>("");

  useEffect(() => {
    setSelectedTool("todo");
    if (isLoggedIn) {
      fetch(`${import.meta.env.VITE_API_URL}/todo/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTodoItemsList(data.todo_items);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  function handleSubmitTodoItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        text: newTodoState,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
        return response.json();
      })
      .then((data) => {
        setTodoItemsList(data.todo_items);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleChangeTodoItemStatus(
    todo_item_id: string,
    new_status: boolean,
  ) {
    fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        todo_item_id: todo_item_id,
        new_status: new_status,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log(todoItemsList);

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#232323] text-[#E8E8E8]">
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <h1 className="m-8 text-center text-2xl">Your current todo list: </h1>
      <div className="flex flex-col items-center">
        {todoItemsList !== null &&
        todoItemsList.length !== 0 &&
        todoItemsList !== null ? (
          <ul className="flex flex-col gap-4">
            {todoItemsList.map((todo) => {
              return (
                <li
                  className="cursor-pointer shadow"
                  key={todo._id}
                  onClick={() =>
                    handleChangeTodoItemStatus(todo._id, !todo.is_done)
                  }
                >
                  <div className="flex justify-between gap-8 rounded border-2 border-black bg-gray-200 p-3">
                    <p className={todo.is_done ? "line-through" : undefined}>
                      {todo.text}
                    </p>
                    <div
                      className={`h-[30px] w-[30px] rounded-full ${
                        todo.is_done ? "bg-green-500" : "bg-red-500"
                      } }`}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>You don&apos;t have any todo items yet...</p>
        )}
      </div>
      <form
        onSubmit={(e) => handleSubmitTodoItem(e)}
        className="m-8 flex flex-col items-center"
      >
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring m-4 flex h-10
            rounded border-2 border-black p-1 px-3 py-2 text-sm shadow file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="new-todo"
          placeholder="Add a new element.."
          onChange={(e) => setNewTodoState(e.target.value)}
          value={newTodoState}
        />
        <input
          type="submit"
          value="Enter"
          className="text-kg rounded border-2 border-black bg-blue-700 p-2 text-white shadow"
        />
      </form>
    </div>
  );
}
