import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type InspectFlashCardProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
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
  const [packState, setPackState] = useState<FlashCardPacksType | undefined>(
    undefined,
  );

  useEffect(() => {
    setSelectedTool("flashcards");
    let params = new URLSearchParams(document.location.search);
    let packId = params.get("packid");
    fetch(`${import.meta.env.VITE_API_URL}/flashcards/packs/${packId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPackState(data.pack);
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
      {packState !== undefined ? (
        <div>
          <p className="m-8 text-center text-xl">
            Name of the pack:{" "}
            <span className="font-bold">{packState.name}</span>
          </p>
        </div>
      ) : undefined}
    </div>
  );
}
