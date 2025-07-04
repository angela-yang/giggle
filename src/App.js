import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Sidebar from "./components/SideBar.js";
import ColorToggle from "./components/ColorToggle.js";
import SignIn from "./components/SignIn.js";
import CreateAccount from "./components/CreateAccount.js";
import FindJob from './components/level/FindJob';
import Organize from './components/level/Organize';
import Interview from './components/level/Interview';
import './App.css';

// Placeholder pages for each level
const Level1 = () => <div className="p-6 text-xl">Level 1: Find a Job</div>;
const Level2 = () => <div className="p-6 text-xl">Level 2: Organize Jobs</div>;
const Level3 = () => <div className="p-6 text-xl">Level 3: Interview Prep</div>;

function App() {
  return (
    <Router>
      <ColorToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level/1" element={<FindJob />} />
        <Route path="/level/2" element={<Organize />} />
        <Route path="/level/3" element={<Interview />} />
        <Route
          path="/level/:id"
          element={
            <div className="flex min-h-screen bg-blue-50">
              <Sidebar />
              <div className="flex-1 p-4">
                <Routes>
                  <Route path="1" element={<FindJob />} />
                  <Route path="2" element={<Organize />} />
                  <Route path="3" element={<Interview />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

