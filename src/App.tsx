import { useState } from "react";
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
import EditFlashCard from "./components/EditFlashCards";
import StudyPack from "./components/StudyPack";

function App() {
  // useEffect(() => {
  //   document.title = "Redstone - The Ultimate Study Tool!";
  // });

  const [selectedTool, setSelectedTool] = useState<
    null | "timer" | "timetracker" | "flashcards"
  >("timer");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("token") !== null,
  );

  return (
    <div className="min-h-screen font-sans">
      <Router basename="/">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/study/timer"
            element={
              <Timer
                isLoggedIn={isLoggedIn}
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
          <Route
            path="/study/flashcards/packs/edit"
            element={
              <EditFlashCard
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            }
          />
          <Route
            path="/study/flashcards/packs/use"
            element={
              <StudyPack
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
