import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type InspectFlashCardProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null | "todo">
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
};

type FlashCardPacksType = {
  name: string;
  pack_state: string[][];
  userid: string;
  __v: number;
  _id: string;
};

export default function InspectFlashCardPack({
  selectedTool,
  setSelectedTool,
}: InspectFlashCardProps) {
  const [thisPack, setThisPack] = useState<FlashCardPacksType | undefined>(
    undefined,
  );

  useEffect(() => {
    setSelectedTool("flashcards");
    let params = new URLSearchParams(document.location.search);
    let packId: string | null = params.get("packid");
    fetch(`${import.meta.env.VITE_API_URL}/flashcards/packs/${packId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setThisPack(data.pack);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(thisPack);

  return (
    <div>
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <button className="m-4 underline">
        <a href="/study/flashcards">
          &lt;- Go back to see all of the flashcard packs !
        </a>
      </button>
      {thisPack !== undefined ? (
        <div>
          <p className="m-8 text-center text-xl">
            Name of the pack: <span className="font-bold">{thisPack.name}</span>
          </p>
        </div>
      ) : undefined}
      <div className="mt-24 flex justify-center gap-8">
        <button className="rounded bg-blue-700 p-2 text-2xl text-white">
          <a href={"/study/flashcards/packs/edit?packid=" + thisPack?._id}>
            Edit this pack
          </a>
        </button>
        <button className="rounded bg-blue-700 p-2 text-2xl text-white">
          <a href={"/study/flashcards/packs/use?packid=" + thisPack?._id}>
            Study this pack
          </a>
        </button>
      </div>
    </div>
  );
}
