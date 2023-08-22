import React, { useEffect } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type TimerProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
};

export default function Timer({ selectedTool, setSelectedTool }: TimerProps) {
  useEffect(() => {
    setSelectedTool("timer");
  }, []);

  return (
    <div>
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <p>timer</p>
    </div>
  );
}
