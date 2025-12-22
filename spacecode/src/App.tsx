import React from 'react';

import Home from "./pages/Home"
import Exercices from "./pages/Exercices"

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/exercice" element={<Exercices />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
