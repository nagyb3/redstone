import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TimeTracker from "./components/TimeTracker";
import FlashCards from "./components/FlashCards";
import CreateFlashCard from "./components/CreateFlashCard";
import TimeTrackerStats from "./components/TimeTrackerStats";
import InspectFlashCardPack from "./components/InspectFlashCardPack";

function App() {
  useEffect(() => {
    document.title = "Redstone - The Ultimate Study Tool!";
  });

  const [selectedTool, setSelectedTool] = useState<
    null | "timer" | "timetracker" | "flashcards"
  >("timer");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("token") !== null,
  );

  // console.log("isLoggedIn", isLoggedIn);
  // console.log(localStorage.getItem("token"));

  return (
    <div className="min-h-screen">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/study/timer"
            element={
              <Timer
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            }
          />
          <Route
            path="/study/timetracker"
            element={
              <TimeTracker
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            }
          />
          <Route
            path="/study/timetracker/stats"
            element={
              <TimeTrackerStats
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            }
          />
          <Route
            path="/study/flashcards"
            element={
              <FlashCards
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/study/flashcards/create"
            element={<CreateFlashCard />}
          />
          <Route
            path="/study/flashcards/packs"
            element={
              <InspectFlashCardPack
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
