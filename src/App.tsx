import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Redstone - The Ultimate Study Tool!";
  });

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
