import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";
import { Button } from "./ui/button";

type TimerProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | "todo" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
  isLoggedIn: boolean;
};

export default function Timer({
  selectedTool,
  setSelectedTool,
  isLoggedIn,
}: TimerProps) {
  useEffect(() => {
    setSelectedTool("timer");
  }, []);

  const [timer, setTimer] = useState(1800); // 30 minutes in seconds

  const [resetTo, setResetTo] = useState(1800);

  const [isRunning, setIsRunning] = useState(false);

  const [showSubmitToTracked, setShowSubmitToTracked] = useState(false);

  const [showSubmittedMessage, setShowSubmittedMessage] = useState(false);

  useEffect(() => {
    if (isRunning) {
      if (showSubmittedMessage) {
        setShowSubmittedMessage(false);
      }
      if (showSubmitToTracked) {
        setShowSubmitToTracked(false);
      }
    }
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0) {
      setShowSubmitToTracked(true);
      setIsRunning(false);
    }
  }, [timer]);

  const minutes: number = Math.floor(timer / 60);
  const seconds: number = timer % 60;

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  function handleReset() {
    isRunning && setIsRunning(false);
    setTimer(resetTo);
    setShowSubmitToTracked(false);
  }

  function handleMinusOne() {
    if (!showSubmitToTracked) {
      setIsRunning(false);
      setResetTo((prev) => prev - 60);
      setTimer((prev) => prev - 60);
    }
  }

  function handleMinusFive() {
    if (!showSubmitToTracked) {
      setIsRunning(false);
      setResetTo((prev) => prev - 60 * 5);
      setTimer((prev) => prev - 60 * 5);
    }
  }

  function handlePlusFive() {
    if (!showSubmitToTracked) {
      setIsRunning(false);
      setResetTo((prev) => prev + 60 * 5);
      setTimer((prev) => prev + 60 * 5);
    }
  }

  function handlePlusOne() {
    if (!showSubmitToTracked) {
      setIsRunning(false);
      setResetTo((prev) => prev + 60);
      setTimer((prev) => prev + 60);
    }
  }

  const handleAddToTracked = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/timetracker`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          time: resetTo / 60,
        }),
      },
    );
    if (response.status === 200) {
      setShowSubmitToTracked(false);
      setShowSubmittedMessage(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)]">
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />

      <div
        className={`flex h-[calc(100vh-180px)] flex-col items-center justify-center gap-8 bg-[#232323] pb-16 transition-[background-color] duration-500 ${
          isRunning ? "bg-blue-200" : undefined
        } ${showSubmitToTracked ? "bg-orange-200" : undefined}`}
      >
        <div className="flex gap-4">
          <Button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-[#E8E8E8] shadow-xl hover:bg-blue-900"
            onClick={handleMinusOne}
          >
            -1
          </Button>
          <Button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-[#E8E8E8] shadow-xl hover:bg-blue-900"
            onClick={handleMinusFive}
          >
            -5
          </Button>
          <Button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-[#E8E8E8] shadow-xl hover:bg-blue-900"
            onClick={handlePlusFive}
          >
            +5
          </Button>
          <Button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-[#E8E8E8] shadow-xl hover:bg-blue-900"
            onClick={handlePlusOne}
          >
            +1
          </Button>
        </div>
        <p className="text-8xl text-[#E8E8E8] sm:text-9xl">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
        <div className="flex gap-8">
          <Button
            className="rounded border-[1px] border-white bg-green-800 p-6 text-3xl font-bold tracking-wider text-[#E8E8E8] shadow-xl"
            onClick={handleStart}
          >
            {isRunning ? "STOP" : "START"}
          </Button>
          <Button
            className="rounded border-[1px] border-white bg-red-800 p-6 text-3xl font-bold tracking-wider text-[#E8E8E8] shadow-xl"
            onClick={handleReset}
          >
            RESET
          </Button>
        </div>
        {showSubmitToTracked && isLoggedIn ? (
          <button
            onClick={handleAddToTracked}
            className="mt-4 rounded bg-orange-800 p-2 text-2xl text-[#E8E8E8] underline"
          >
            Add to tracked times!
          </button>
        ) : undefined}
        {showSubmittedMessage ? (
          <p className="mt-4 text-xl font-bold text-green-700">
            Time successfully submitted!
          </p>
        ) : undefined}
      </div>
    </div>
  );
}
