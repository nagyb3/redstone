import { Button } from "./ui/button";

type NavBarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ isLoggedIn }: NavBarProps) {
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  }

  return (
    <div
      className="flex h-[60px] items-center justify-between border-b-[1px]
     border-b-gray-400 bg-[rgb(35,35,35)] px-4 sm:px-8"
    >
      <h1 className="w-fit font-bold text-[#E8E8E8]">
        <a href="/">Redstone</a>
      </h1>
      <ul className="flex items-center gap-4 sm:gap-8">
        {!isLoggedIn ? (
          <li>
            <Button variant="link" className="text-[#E8E8E8]">
              <a href="/login">Login</a>
            </Button>
          </li>
        ) : (
          <li className="cursor-pointer" onClick={handleLogout}>
            <Button variant="link" className="text-[#E8E8E8]">
              Logout
            </Button>
          </li>
        )}
        <li>
          {/* <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> */}
          <Button
            asChild
            className="bg-sky-900 font-semibold text-[#E8E8E8] hover:bg-sky-800"
          >
            <a href="/study/timer">Use Timer</a>
          </Button>
          {/* </button> */}
        </li>
      </ul>
    </div>
  );
}
