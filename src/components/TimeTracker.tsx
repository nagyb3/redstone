import React, { useEffect } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type TimeTrackerProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
};

export default function TimeTracker({
  selectedTool,
  setSelectedTool,
}: TimeTrackerProps) {
  useEffect(() => {
    setSelectedTool("timetracker");
  });

  const [timeState, setTimeState] = React.useState<number>(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/timetracker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: timeState,
        userid: "1",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }

  console.log(import.meta.env.VITE_API_URL);

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTimeState(Number(e.target.value));
  }

  return (
    <div>
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <h1 className="font-sembol mt-8 text-center text-xl">TimeTracker</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-16 flex flex-col items-center gap-8"
      >
        <div>
          <label htmlFor="number">Enter minutes: </label>
          <input
            type="number"
            name="number"
            id="number"
            className="rounded border-[1px] border-black p-1"
            value={timeState}
            onChange={(e) => handleTimeChange(e)}
          />
        </div>
        <input
          type="submit"
          value="SUBMIT"
          className="rounded border-[1px] border-black bg-blue-800 p-2 text-xl text-white"
        />
      </form>
    </div>
  );
}
