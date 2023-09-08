import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type TimerProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
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
    setIsRunning(false);
    setResetTo((prev) => prev - 60);
    setTimer((prev) => prev - 60);
  }

  function handleMinusFive() {
    setIsRunning(false);
    setResetTo((prev) => prev - 60 * 5);
    setTimer((prev) => prev - 60 * 5);
  }

  function handlePlusFive() {
    setIsRunning(false);
    setResetTo((prev) => prev + 60 * 5);
    setTimer((prev) => prev + 60 * 5);
  }

  function handlePlusOne() {
    setIsRunning(false);
    setResetTo((prev) => prev + 60);
    setTimer((prev) => prev + 60);
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

      <div className="mt-[20vh] flex flex-col items-center justify-center gap-8">
        <div className="flex gap-4">
          <button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-white"
            onClick={handleMinusOne}
          >
            -1
          </button>
          <button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-white"
            onClick={handleMinusFive}
          >
            -5
          </button>
          <button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-white"
            onClick={handlePlusFive}
          >
            +5
          </button>
          <button
            className="rounded bg-blue-800 px-3 py-2 text-xl tracking-wider text-white"
            onClick={handlePlusOne}
          >
            +1
          </button>
        </div>
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
        {showSubmitToTracked && isLoggedIn ? (
          <button
            onClick={handleAddToTracked}
            className="mt-4 rounded bg-green-400 p-2 text-2xl underline"
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
