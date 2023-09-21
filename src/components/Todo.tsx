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
};

export default function Todo({
  selectedTool,
  setSelectedTool,
  isLoggedIn,
}: TodoProps) {
  const [todoItemsList, setTodoItemsList] = useState<
    TodoItemType[] | undefined | null
  >(undefined);

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
          user_id: localStorage.getItem("username"),
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

  console.log(todoItemsList);

  function handleSubmitTodoItem() {
    fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("username"),
        text: newTodoState,
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

  return (
    <div className="min-h-[calc(100vh-70px)]">
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <h1 className="m-16 text-center text-2xl">Your current todo list: </h1>
      <form action="">
        <label htmlFor="new-todo">New element:</label>
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex
            h-10 w-full rounded border-[1px] border-black p-1 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="new-todo"
          placeholder="Element's name.."
        />
        <input
          type="submit"
          value="Enter"
          className="text-kg rounded border-[1px] border-black bg-blue-700 p-2 text-white"
        />
      </form>
      {todoItemsList !== undefined && todoItemsList !== null ? (
        <ul>
          {todoItemsList.map((todo) => {
            return <li>{todo.text}</li>;
          })}
        </ul>
      ) : undefined}
    </div>
  );
}
