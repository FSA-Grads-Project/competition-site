import React from "react";
import Header from "./Components/Header";
import Landing from "./Components/Landing";
import Problem from "./Components/Problem";
import { Route, Routes } from "react-router-dom";
import About from "./Components/About";
import Account from "./Components/Account";
import PreviousProblems from "./Components/PreviousProblems";
import Login from "./Components/Login";
import LoginModal from "./Components/LoginModal";
import UserCheck from "./Components/UserCheck";
import "./style.css";

const App = () => {
  return (
    <div>
      <LoginModal />
      <Routes>
        <Route element={<UserCheck />}>
          <Route element={<Header />}>
            <Route path="/" element={<Landing />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/problems/:id" element={<Problem />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/pastissues" element={<PreviousProblems />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
