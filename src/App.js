import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Footer from './Footer';
import Organization from './Organization';
import Login from './Login';
import AddOrganization from './AddOrganization';
import Department from './Department';
import Branch from './Branch';
import Designation from './Designation';
import Dashboard from './Dashboard';

function App() {
  return (

   
    <Router>
            <Routes>
              {/* <Route path='/' element={<Login />} /> */}
              <Route path='/' element={<Organization />} />
              <Route path='/branch' element={<Branch />} />
              <Route path='/department' element={<Department />} />
              <Route path='/designation' element={<Designation />} />
            </Routes>
    </Router>
  );
}

export default App;
