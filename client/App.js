import React from 'react';
import Landing from './Components/Landing';
import Problem from './Components/Problem';
import Nav from './Components/Nav';
import { Route, Routes } from "react-router-dom";
import About from './Components/About';
import Account from './Components/Account';
import PreviousProblems from './Components/PreviousProblems';
import { Link } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './style.css';
import { Logo, Issue, Header, Hidden } from './StyledComponents/AppStyles.tw';

const App = () => {
    return (
     <div>
        <Header>
          <Hidden>hidden</Hidden>
          <Logo><Link to='/'>The Dispatch</Link></Logo>
          <Issue><Link to='/problem'>Issue 1</Link></Issue>
        </Header> 
        <Nav/>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/problem' element={<Problem/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/pastissues' element={<PreviousProblems/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
        </Routes>
     </div>
    );
  };

export default App;
