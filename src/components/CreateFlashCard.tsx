import React from "react";

export default function CreateFlashCard() {
  const [packState, setPackState] = React.useState<string[][]>();

  const [cardsInPack, setCardsInPack] = React.useState<number>(1);

  function handleAddExtraCard() {
    setCardsInPack((prev) => prev + 1);
  }

  function handleRemoveLastCard() {
    setCardsInPack((prev) => prev - 1);
  }

  function handleSubmit() {}

  return (
    <div>
      <button className="m-4 underline">
        <a href="/study/flashcards">&lt;- Go back to flashcards</a>
      </button>
      <h1 className="m-8 text-center text-xl font-bold">
        Create a flash card pack
      </h1>
      {/* <div className="grid grid-cols-2 justify-items-center">
        <p className="m-4 text-xl font-bold">First side</p>
        <p className="m-4 text-xl font-bold">Second side</p>
        
      </div> */}
      <div className="grid grid-cols-2 justify-items-center">
        <div className="flex flex-col items-center gap-4">
          <p className="m-4 text-xl font-bold">First Side</p>
          {Array(cardsInPack).fill(
            <input
              placeholder="First side content"
              className="border-[1px] border-black p-2"
              type="text"
            />,
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="m-4 text-xl font-bold">Second side</p>
          {Array(cardsInPack).fill(
            <input
              placeholder="Second side content"
              className="border-[1px] border-black p-2"
              type="text"
            />,
          )}
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center gap-4">
        <button
          className="rounded-xl bg-black p-2 text-white underline"
          onClick={handleRemoveLastCard}
        >
          Remove last Card
        </button>
        <button
          className="rounded-xl bg-black p-2 text-white underline"
          onClick={handleAddExtraCard}
        >
          Add Extra card
        </button>
        <button
          className="rounded bg-blue-700 p-4 text-white"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
