import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";
import { Button } from "./ui/button";

type StudyPackProps = {
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
    if (thisPack?.pack_state !== undefined && thisPack?.pack_state.length > 1) {
      let newRandom = currentCard;
      while (newRandom === currentCard) {
        newRandom =
          thisPack?.pack_state[
            Math.floor(Math.random() * thisPack?.pack_state.length)
          ];
      }
      setCurrentCard(newRandom);
    }
  }

  function handleRotateCard() {
    setIsAnswerRevealed((prev) => !prev);
  }

  function handleNextCard() {
    randomCard();
  }

  const [isAnswerRevealed, setIsAnswerRevealed] =
    React.useState<boolean>(false);

  function handleFinishPack() {
    window.location.href = "/study/flashcards";
  }

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#232323] text-[#E8E8E8]">
      <StudySectionsNavbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
      />
      {currentCard ? (
        <div className="mt-16 flex h-[calc(100vh-180px)] flex-col items-center gap-4">
          <Button
            variant="link"
            onClick={handleFinishPack}
            className="mb-16 text-[#E8E8E8]"
          >
            &lt;- Finish studying this card pack...
          </Button>
          <div
            id="card"
            className="border-[1px] border-black bg-gray-400 px-16 py-8 text-3xl text-black"
          >
            {isAnswerRevealed ? currentCard[0] : currentCard[1]}
          </div>
          <div className="flex gap-4">
            <button
              className="rounded bg-black p-3 text-white"
              onClick={handleRotateCard}
            >
              ROTATE CARD
            </button>
            <button
              className="rounded bg-black p-3 text-white"
              onClick={handleNextCard}
            >
              NEXT CARD
            </button>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}
