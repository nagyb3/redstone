import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";
import { Input } from "./ui/input";

type TimeTrackerProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null | "todo">
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards" | "todo";
};

type TrackedTimesType = {
  _id: string;
  __v: number;
  userid: string;
  time: number;
  creation_date: string;
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

  const [trackedTimesForUser, setTrackedTimesForUser] = useState<
    TrackedTimesType[] | undefined
  >(undefined);

  const [todayMinutes, setTodayMinutes] = useState<undefined | number>(
    undefined,
  );

  const [thisMonthMinutes, setThisMonthMinutes] = useState<undefined | number>(
    undefined,
  );

  useEffect(() => {
    setSelectedTool("timetracker");
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/timetracker/stats/users/${localStorage.getItem("username")}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTrackedTimesForUser(data.tracked_times_for_user);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (trackedTimesForUser !== undefined) {
      getTodayMinutes();
      getThisMonthMinutes();
    }
  }, [trackedTimesForUser]);

  const isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  const isThisMonth = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  function getTodayMinutes() {
    let todayMinutesCounter = 0;
    if (trackedTimesForUser !== undefined) {
      trackedTimesForUser.forEach((time) => {
        if (isToday(new Date(time.creation_date))) {
          todayMinutesCounter += time.time;
        }
      });
      setTodayMinutes(todayMinutesCounter);
    }
  }

  function getThisMonthMinutes() {
    let thisMonthCounter = 0;
    if (trackedTimesForUser !== undefined) {
      trackedTimesForUser.forEach((time) => {
        if (isThisMonth(new Date(time.creation_date))) {
          thisMonthCounter += time.time;
        }
      });
      setThisMonthMinutes(thisMonthCounter);
    }
  }

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
    <div className="min-h-[calc(100vh-60px)] bg-[#232323] text-[#E8E8E8]">
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <h1 className="m-16 mb-8 text-center text-2xl">TimeTracker stats:</h1>
      <div>
        <p className="mt-8 text-center font-bold">
          Today:{" "}
          {trackedTimesForUser !== undefined
            ? todayMinutes + " minutes"
            : undefined}
        </p>
        <p className="mt-8 text-center font-bold">
          This Month:{" "}
          {trackedTimesForUser !== undefined
            ? thisMonthMinutes + " minutes"
            : undefined}
        </p>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-8 flex flex-col items-center gap-8"
      >
        <div>
          <label
            className="mr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="number"
          >
            Enter minutes:{" "}
          </label>
          <div className="flex items-center justify-center gap-8">
            <Input
              type="number"
              name="number"
              id="number"
              min="1"
              placeholder="Enter minutes..."
              className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full
            rounded border-[1px] border-white bg-[#232323] p-1 px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
    </div>
  );
}
