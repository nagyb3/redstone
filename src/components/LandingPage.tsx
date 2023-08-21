import React from "react";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="mt-24 text-2xl md:text-4xl">
          All the tools to study at maximum efficiency.
        </h1>
        <p className="m-8 max-w-[500px] text-center text-gray-700">
          Can&apos;t focus while studying? Now you access all the tools you
          might need to study from this simple page.
        </p>
        <button
          className="m-4 rounded-lg bg-black px-5 py-2.5 text-base
       font-medium text-white hover:bg-gray-800 focus:outline-none
        focus:ring-4 focus:ring-blue-300 dark:hover:bg-gray-800 dark:focus:ring-gray-400"
        >
          <a href="/study">Start Studying!</a>
        </button>
      </div>
    </div>
  );
}
