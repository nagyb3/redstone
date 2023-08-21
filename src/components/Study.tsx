import { useState } from "react";

export default function Study() {
  const [selectedTool, setSelectedTool] = useState<
    null | "timer" | "timetracker" | "flashcards"
  >(null);

  function handleFlashCards() {
    setSelectedTool("flashcards");
    document.location.href = "/study/flashcards";
  }

  function handleTimer() {
    setSelectedTool("timer");
    document.location.href = "/study/timer";
  }

  function handleTimeTracker() {
    setSelectedTool("timetracker");
    document.location.href = "/study/timer";
  }

  return (
    <div>
      <div className="flex h-[120px] items-center justify-around bg-gray-200 px-16">
        <a
          className={`hover:bg-gray-300" href="/study/timer rounded p-3 ${
            selectedTool === "timer" ? "bg-gray-300" : undefined
          }`}
        >
          Timer
        </a>
        <a
          className={`hover:bg-gray-300" href="/study/timer rounded p-3 ${
            selectedTool === "timetracker" ? "bg-gray-300" : undefined
          }`}
          href="/study/timetracker"
        >
          TimeTracker
        </a>
        <a
          className={`hover:bg-gray-300" href="/study/timer rounded p-3 ${
            selectedTool === "flashcards" ? "bg-gray-300" : undefined
          }`}
          href="/study/flashcards"
          onClick={handleFlashCards}
        >
          Flashcards
        </a>
      </div>
      <main></main>
    </div>
  );
}
