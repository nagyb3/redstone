import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type StudyPackProps = {
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

export default function StudyPack({
  selectedTool,
  setSelectedTool,
}: StudyPackProps) {
  const [thisPack, setThisPack] = useState<FlashCardPacksType | undefined>(
    undefined,
  );

  const [currentCard, setCurrentCard] = useState<string[] | undefined>(
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

  useEffect(() => {
    randomCard();
  }, [thisPack]);

  function randomCard() {
    setCurrentCard(
      thisPack?.pack_state[
        Math.floor(Math.random() * thisPack?.pack_state.length)
      ],
    );
  }

  function handleRotateCard() {
    //
  }

  return (
    <div>
      <StudySectionsNavbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
      />
      {currentCard ? (
        <div id="card" className="">
          {currentCard[0]}
        </div>
      ) : undefined}
    </div>
  );
}
