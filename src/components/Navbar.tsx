export default function Navbar() {
  return (
    <div
      className="flex h-[60px] items-center justify-between
     border-[1px] border-b-gray-400 px-8"
    >
      <h1 className="w-fit font-bold">
        <a href="/">Redstone</a>
      </h1>
      <ul className="flex items-center gap-8">
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <a href="/study/timer">Use Timer</a>
          </button>
        </li>
      </ul>
    </div>
  );
}
