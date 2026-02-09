import React from 'react';

import "./App.css"

import Home from "./pages/Home"
import Exercices from "./pages/Exercices"
import Exo1 from "./pages/Exo1"
import Animation from './pages/Animation';
import Base from './pages/Base';
import HTML from './pages/HTML';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/exercice" element={<Exercices />} />
        <Route path="/exercice/1" element={<Exo1/>} />
        <Route path="/anim" element={<Animation/>} />
        <Route path="/base" element={<Base/>} />
        <Route path="/HTML" element={<HTML/>} />

      </Routes>

      <footer>
          <h3><a href="/"> Retour a l'acceuil</a></h3>
      </footer>

    </BrowserRouter>
    
  );
}

export default App;
