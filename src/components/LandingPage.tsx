import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <div>
      <div className="flex min-h-[calc(100vh-60px)] flex-col items-center bg-[rgb(35,35,35)] text-[#E8E8E8]">
        <h1 className="mt-24 px-4 text-center text-2xl md:text-4xl">
          All the tools to study at maximum efficiency.
        </h1>
        <p className="m-8 max-w-[500px] text-center text-gray-200">
          Can&apos;t focus while studying? Now you access all the tools you
          might need to study from this simple page.
        </p>
        <Button className="border-[1px] border-white p-6 text-xl text-[#E8E8E8] shadow-xl">
          <a href="/study/timer">Start Studying!</a>
        </Button>
      </div>
    </div>
  );
}
