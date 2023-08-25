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

  const [timeState, setTimeState] = React.useState<number | "">("");

  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/timetracker`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          time: timeState,
        }),
      },
    );
    if (response.status === 200) {
      setTimeState("");
      setIsSuccess(true);
    }
  };

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
      <div className="flex justify-center">
        <button className="mt-4 underline">
          <a href="/study/timetracker/stats">Show Stats! -&gt;</a>
        </button>
      </div>
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
            min="1"
            placeholder="Enter minutes..."
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
        <p className="mb-8 text-center font-bold text-green-700">
          {isSuccess && "Time has been submitted successfully!"}
        </p>
      </form>
    </div>
  );
}
