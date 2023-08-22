import React, { useEffect, useState } from "react";
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

  const [timer, setTimer] = useState(1800); // 30 minutes in seconds

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0) {
      setIsRunning(false);
    }
  }, [timer]);

  const minutes: number = Math.floor(timer / 60);
  const seconds: number = timer % 60;

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  // function handleMinuteChange() {
  //   let hours = 0;
  //   let minutes = 0;
  //   let newAmount = prompt("");
  //   if (newAmount === null) {
  //     newAmount = "3000";
  //   }
  //   newAmount = [...newAmount];
  //   let seconds = parseInt(newAmount.splice(newAmount.length - 2, 2).join(""));
  //   if (newAmount.length > 0) {
  //     minutes = parseInt(newAmount.splice(newAmount.length - 2, 2).join(""));
  //   }
  //   if (newAmount.length > 0) {
  //     hours = parseInt(newAmount.join(""));
  //   }
  //   console.log(hours, minutes, seconds);
  //   setTimer(hours * 3600 + minutes * 60 + seconds);
  // }

  function handleReset() {
    isRunning && setIsRunning(false);
    setTimer(1800);
  }

  return (
    <div className="min-h-[calc(100vh-70px)]">
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />

      <div className="mt-[20vh] flex flex-col items-center justify-center gap-8">
        <p className="text-9xl">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
        <div className="flex gap-8">
          <button
            className="rounded bg-green-800 p-3 text-xl font-bold tracking-wider text-white"
            onClick={handleStart}
          >
            {isRunning ? "STOP" : "START"}
          </button>
          <button
            className="rounded bg-red-800 p-3 text-xl font-bold tracking-wider text-white"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
