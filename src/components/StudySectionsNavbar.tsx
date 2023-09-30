type StudySectionsNavbarProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null | "todo">
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
};

export default function StudySectionsNavbar({
  selectedTool,
  setSelectedTool,
}: StudySectionsNavbarProps) {
  function handleFlashCards() {
    setSelectedTool("flashcards");
    document.location.href = "/study/flashcards";
  }

  // function handleTimer() {
  //   setSelectedTool("timer");
  //   document.location.href = "/study/timer";
  // }

  // function handleTimeTracker() {
  //   setSelectedTool("timetracker");
  //   document.location.href = "/study/timer";
  // }

  return (
    <div>
      <div className="sm:px-18 flex h-[120px] items-center justify-center gap-8 bg-[#494949] px-4 text-[#E8E8E8] md:gap-24 lg:gap-36">
        <a
          className={`rounded p-3 hover:bg-[#525252] ${
            selectedTool === "timer" ? "bg-[#525252]" : undefined
          }`}
          href="/study/timer"
        >
          Timer
        </a>
        <a
          className={`rounded p-3 hover:bg-[#525252] ${
            selectedTool === "timetracker" ? "bg-[#525252]" : undefined
          }`}
          href="/study/timetracker"
        >
          TimeTracker
        </a>
        <a
          className={`rounded p-3 hover:bg-[#525252] ${
            selectedTool === "flashcards" ? "bg-[#525252]" : undefined
          }`}
          href="/study/flashcards"
          onClick={handleFlashCards}
        >
          Flashcards
        </a>
        <a
          className={`rounded p-3 hover:bg-[#525252] ${
            selectedTool === "todo" ? "bg-[#525252]" : undefined
          }`}
          href="/todo"
          onClick={handleFlashCards}
        >
          To-Do
        </a>
      </div>
    </div>
  );
}
