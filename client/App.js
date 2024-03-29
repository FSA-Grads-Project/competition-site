import React from 'react';
import Header from './Components/Header';
import ProblemPage from './Components/ProblemPage';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Account from './Components/pages/account/Account';
import PreviousProblems from './Components/PreviousProblems';
import Home from './Components/Home';
import Login from './Components/Login';
import LoginModal from './Components/LoginModal';
import InitialLoginModal from './Components/InitialLoginModal';
import UserCheck from './Components/UserCheck';
import './style.css';

const App = () => {
  return (
    <div id='App' className='app-js'>
      <LoginModal />
      <InitialLoginModal />
      <Routes>
        <Route element={<UserCheck />}>
          <Route element={<Header />}>
            <Route path='/' element={<Home />} />
            <Route path='/problem' element={<ProblemPage />} />
            <Route path='/problem/:id' element={<ProblemPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/account' element={<Account />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
