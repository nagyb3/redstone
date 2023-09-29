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
            Pack name: <span className="font-bold">{thisPack.name}</span>
          </p>
        </div>
      ) : undefined}
      <div className="mt-12 flex flex-col items-center justify-center gap-8">
        <a
          href={"/study/flashcards/packs/use?packid=" + thisPack?._id}
          className="shadow-xl"
        >
          <button
            className="rounded border-[1px] border-black bg-blue-800 p-2 text-2xl 
          font-semibold text-white hover:relative hover:top-[1px] hover:underline"
          >
            Study this pack
          </button>
        </a>
        <a
          href={"/study/flashcards/packs/edit?packid=" + thisPack?._id}
          className="shadow-xl"
        >
          <button className="rounded border-[1px] border-black bg-blue-900 p-2 text-lg text-white">
            Edit this pack
          </button>
        </a>
      </div>
    </div>
  );
}
