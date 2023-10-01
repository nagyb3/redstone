import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      .then((response) => {
        if (response.ok) {
          window.location.href = "/study/flashcards";
        }
      })
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
    <div className="min-h-[calc(100vh-60px)] bg-[#232323] text-[#E8E8E8]">
      <button className="m-4 underline">
        <a href="/study/flashcards">&lt;- Go back to flashcards</a>
      </button>
      <h1 className="m-4 text-center text-xl font-bold">
        Create a flash card pack
      </h1>
      <div className="flex items-center justify-center gap-4">
        <label htmlFor="pack-name" className="text-lg">
          Name:
        </label>
        <Input
          className="max-w-[400px] bg-[#232323] p-2"
          type="text"
          name="pack-name"
          id="pack-name"
          placeholder="Name of the pack..."
          onChange={(e) => handleNameChange(e)}
          value={nameState}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-8 grid w-[700px] max-w-[1000px] grid-cols-2 justify-items-center">
          <div className="flex flex-col items-center gap-4">
            <p className="m-4 text-xl font-bold">Front Side</p>
            {packState.map((elem, index) => {
              return (
                <div className="flex items-center gap-4">
                  <p className="min-w-fit">{index + 1}. card:</p>
                  <Input
                    placeholder="Front side"
                    className="border-[1px] border-white bg-[#232323] p-2"
                    type="text"
                    value={elem[0]}
                    onChange={(e) => handleInputChange(index, 0, e)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="m-4 text-xl font-bold">Back side</p>
            {packState.map((elem, index) => {
              return (
                <Input
                  placeholder="Back side"
                  className="border-[1px] border-white bg-[#232323] p-2"
                  type="text"
                  value={elem[1]}
                  onChange={(e) => handleInputChange(index, 1, e)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button
            className="rounded-lg border-[1px] border-white bg-[#232323] p-2 text-lg text-white hover:relative hover:top-[1px] hover:underline"
            onClick={handleRemoveLastCard}
          >
            Remove Card -
          </Button>
          <Button
            className="rounded-lg border-[1px] border-white bg-[#232323] p-2 text-lg text-white hover:relative hover:top-[1px] hover:underline"
            onClick={handleAddExtraCard}
          >
            Add card +
          </Button>
        </div>
        <Button
          className="m-4 rounded border-[1px] border-[#e8e8e8] bg-blue-800 p-3 text-xl text-white shadow-xl hover:relative hover:top-[1px] hover:bg-blue-900 hover:underline"
          onClick={handleSubmit}
        >
          Submit pack!
        </Button>
      </div>
    </div>
  );
}
