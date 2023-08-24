type NavBarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ isLoggedIn, setIsLoggedIn }: NavBarProps) {
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  }

  return (
    <div
      className="flex h-[60px] items-center justify-between
     border-[1px] border-b-gray-400 px-8"
    >
      <h1 className="w-fit font-bold">
        <a href="/">Redstone</a>
      </h1>
      <ul className="flex items-center gap-8">
        {!isLoggedIn ? (
          <li>
            <a href="/login">Login</a>
          </li>
        ) : (
          <li className="cursor-pointer" onClick={handleLogout}>
            <a>Logout</a>
          </li>
        )}
        <li>
          <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <a href="/study/timer">Use Timer</a>
          </button>
        </li>
      </ul>
    </div>
  );
}
