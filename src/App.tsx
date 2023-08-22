import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    document.title = "Redstone - The Ultimate Study Tool!";
  });

  const [selectedTool, setSelectedTool] = useState<
    null | "timer" | "timetracker" | "flashcards"
  >("timer");

  return (
    <div className="min-h-screen">
      <Router>
        <Navbar />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
