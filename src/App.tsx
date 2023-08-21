import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";
import Study from "./components/Study";

function App() {
  useEffect(() => {
    document.title = "Redstone - The Ultimate Study Tool!";
  });

  return (
    <div className="min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/study" element={<Study />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
