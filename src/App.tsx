import React from 'react';
import { Button } from "@material-tailwind/react";
import Sidenav from './components/Sidenav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Roles from "./components/Roles";
import Demanda from './components/Demanda';
import NoRoutine from './components/NoRoutine';

function App() {
  return (
    <div style={{ display: "flex" }} className='h-auto'>
      <div>
        <Sidenav />
      </div>
      <div className='w-full'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/demanda" element={<Demanda />} />
          <Route path="no-rutinarias" element={<NoRoutine />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
