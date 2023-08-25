import React, { useEffect, useState } from "react";
import StudySectionsNavbar from "./StudySectionsNavbar";

type TimeTrackerStatsProps = {
  setSelectedTool: React.Dispatch<
    React.SetStateAction<"timer" | "timetracker" | "flashcards" | null>
  >;
  selectedTool: null | "timer" | "timetracker" | "flashcards";
};

type TrackedTimesType = {
  _id: string;
  __v: number;
  userid: string;
  time: number;
  creation_date: string;
};

export default function TimeTrackerStats({
  selectedTool,
  setSelectedTool,
}: TimeTrackerStatsProps) {
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

  return (
    <div>
      <StudySectionsNavbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <button className="m-4 underline">
        <a href="/study/timetracker">&lt;- Go back to submit time</a>
      </button>
      <h1 className="m-8 text-center text-xl font-bold">Time Tracker Stats</h1>
      <p className="text-center">
        You are currently logged in as:{" "}
        <span className="font-bold text-blue-800">
          {localStorage.getItem("username")}
        </span>
      </p>
      <p className="mt-8 text-center font-bold">
        Minutes today :{" "}
        {trackedTimesForUser !== undefined ? todayMinutes : undefined}
      </p>
      <p className="mt-8 text-center font-bold">
        This Month :{" "}
        {trackedTimesForUser !== undefined ? thisMonthMinutes : undefined}
      </p>
    </div>
  );
}
