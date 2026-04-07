import React from 'react';

import "./App.css"

import Home from "./pages/Home"
import Exercices from "./pages/Exercices"
import Animation from './pages/Animation';
import Base from './pages/Base';
import HTML from './pages/HTML';
import Myexo from './pages/Myexo';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tablet from './compenents/Tablet';
import Introduction from './pages/Introduction';
import Connection from './pages/Connection';
import Register from './pages/Register';

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercice" element={<Exercices />} />
        <Route path="/exercice/1" element={<Tablet/>} />
        <Route path="/anim" element={<Animation/>} />
        <Route path="/base" element={<Base/>} />
        <Route path="/HTML" element={<HTML/>} />
        <Route path="/myexo" element={<Myexo/>} />

      </Routes>

    </BrowserRouter>
    
  );
}

export default App;
