import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";
import { Button } from "./ui/button";

type FlashCardsProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null | "todo">
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
  isLoggedIn: boolean;
};

type FlashCardPacksType = {
  name: string;
  pack_state: string[][];
  userid: string;
  __v: number;
  _id: string;
};

export default function FlashCards({
  selectedTool,
  setSelectedTool,
  isLoggedIn,
}: FlashCardsProps) {
  const [thisUserFlashCardPacks, setThisUserFlashCardPacks] = useState<
    FlashCardPacksType[]
  >([]);

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
        .then((data) => {
          setThisUserFlashCardPacks(data.flashcard_packs_for_user);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#232323] text-[#E8E8E8]">
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <div className="flex flex-col items-center">
        {isLoggedIn ? (
          <div className="flex flex-col items-center">
            <p className="m-8 mt-16 text-2xl">Your flashcard packs:</p>
            {thisUserFlashCardPacks?.length !== 0 ? (
              <ul className="flex list-disc flex-col gap-2">
                {thisUserFlashCardPacks.map((flashCardPack) => {
                  return (
                    <li key={flashCardPack._id} className="hover:underline">
                      <a
                        href={
                          "/study/flashcards/packs?packid=" + flashCardPack._id
                        }
                      >
                        {flashCardPack.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="font-bold">
                You don&apos;t you have any packs yet!
              </p>
            )}
            <Button className="m-8 border-[1px] border-white hover:underline">
              <a href="/study/flashcards/create">Make a new pack -&gt;</a>
            </Button>
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
