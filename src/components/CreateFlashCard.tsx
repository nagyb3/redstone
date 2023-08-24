import React from "react";

export default function CreateFlashCard() {
  const [packState, setPackState] = React.useState<(string | undefined)[][]>([
    ["", ""],
  ]);

  const [cardsInPack, setCardsInPack] = React.useState<number>(1);

  const [nameState, setNameState] = React.useState<string>("");

  function handleAddExtraCard() {
    setCardsInPack((prev) => prev + 1);
    setPackState((curr) => [...curr, [undefined, undefined]]);
  }

  function handleRemoveLastCard() {
    if (cardsInPack > 1) {
      setCardsInPack((prev) => prev - 1);
      setPackState(packState.slice(0, -1));
    }
  }

  function handleSubmit() {
    fetch(`${import.meta.env.VITE_API_URL}/flashcards/packs/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        pack_state: packState,
        name: nameState,
      }),
    })
      .then((response) => {})
      .then((data) => {})
      .catch((error) => console.error(error));
  }

  function handleInputChange(
    a: number,
    b: 0 | 1,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    let newPackState: (string | undefined)[][] = [];
    packState.forEach((elem, index) => {
      if (index !== a) {
        newPackState.push(elem);
      } else {
        if (b === 0) {
          newPackState.push([e.target.value, elem[1]]);
        } else if (b === 1) {
          newPackState.push([elem[0], e.target.value]);
        }
      }
    });
    setPackState(newPackState);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNameState(e.target.value);
  }

  return (
    <div>
      <button className="m-4 underline">
        <a href="/study/flashcards">&lt;- Go back to flashcards</a>
      </button>
      <h1 className="m-8 text-center text-xl font-bold">
        Create a flash card pack
      </h1>
      <div className="mb-8 flex items-center justify-center gap-4">
        <label htmlFor="pack-name" className="text-lg">
          Name of the pack:
        </label>
        <input
          className="border-[1px] border-black p-2"
          type="text"
          name="pack-name"
          id="pack-name"
          placeholder="Enter name for the pack..."
          onChange={(e) => handleNameChange(e)}
          value={nameState}
        />
      </div>
      <div className="grid grid-cols-2 justify-items-center">
        <div className="flex flex-col items-center gap-4">
          <p className="m-4 text-xl font-bold">First Side</p>
          {packState.map((elem, index) => {
            return (
              <input
                placeholder="First side content"
                className="border-[1px] border-black p-2"
                type="text"
                value={elem[0]}
                onChange={(e) => handleInputChange(index, 0, e)}
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="m-4 text-xl font-bold">Second side</p>
          {packState.map((elem, index) => {
            return (
              <input
                placeholder="First side content"
                className="border-[1px] border-black p-2"
                type="text"
                value={elem[1]}
                onChange={(e) => handleInputChange(index, 1, e)}
              />
            );
          })}
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
