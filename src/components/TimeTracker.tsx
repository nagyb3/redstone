import React, { useEffect } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type TimeTrackerProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null | "todo">
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
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
      <h1 className="m-16 text-center text-2xl">TimeTracker</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center gap-8"
      >
        <div>
          <label
            className="mr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="number"
          >
            Enter minutes:{" "}
          </label>
          <div className="flex items-center justify-center gap-8">
            <input
              type="number"
              name="number"
              id="number"
              min="1"
              placeholder="Enter minutes..."
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex
            h-10 w-full rounded border-[1px] border-black p-1 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={timeState}
              onChange={(e) => handleTimeChange(e)}
            />
            <input
              type="submit"
              value="SUBMIT"
              className="text-kg rounded border-[1px] border-black bg-blue-700 p-2 text-white"
            />
          </div>
        </div>
        <p className="mb-8 text-center font-bold text-green-700">
          {isSuccess && "Time has been submitted successfully!"}
        </p>
      </form>
      <div className="flex justify-center">
        <button className="mt-4 underline">
          <a href="/study/timetracker/stats">Show Stats! -&gt;</a>
        </button>
      </div>
    </div>
  );
}
