import React, { useEffect } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type FlashCardsProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
  isLoggedIn: boolean;
};

export default function FlashCards({
  selectedTool,
  setSelectedTool,
  isLoggedIn,
}: FlashCardsProps) {
  useEffect(() => {
    setSelectedTool("flashcards");
    //based on username!!
    if (localStorage.getItem("username") !== null) {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/flashcards/packs/users/${localStorage.getItem("username")}`,
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  });

  return (
    <div>
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <div className="flex flex-col items-center">
        <h1 className="mt-8 text-center text-2xl">Flash cards</h1>
        {isLoggedIn ? (
          <div>
            <p className="m-8">Your packs:</p>
            <button className=" rounded bg-black p-2 text-white">
              <a href="/study/flashcards/create">Make a new pack</a>
            </button>
          </div>
        ) : (
          <div>
            <p className="mt-8 text-lg font-bold">Log in first to use packs!</p>
          </div>
        )}
      </div>
    </div>
  );
}
