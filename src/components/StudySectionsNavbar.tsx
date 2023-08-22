type StudySectionsNavbarProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
};

export default function StudySectionsNavbar({
  selectedTool,
  setSelectedTool,
}: StudySectionsNavbarProps) {
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
          className={`rounded p-3 hover:bg-gray-300 ${
            selectedTool === "timer" ? "bg-gray-300" : undefined
          }`}
          href="/study/timer"
        >
          Timer
        </a>
        <a
          className={`rounded p-3 hover:bg-gray-300 ${
            selectedTool === "timetracker" ? "bg-gray-300" : undefined
          }`}
          href="/study/timetracker"
        >
          TimeTracker
        </a>
        <a
          className={`rounded p-3 hover:bg-gray-300 ${
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
