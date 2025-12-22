import React from 'react';

import Home from "./pages/Home"
import Exercices from "./pages/Exercices"
import Exo1 from "./pages/Exercices/Exo1"

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/exercice" element={<Exercices />} />
        <Route path="/exercice/1" element={<Exo1/>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
