import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import './App.css';
import { Pokemon } from './components/Pokemon/Pokemon';
import { PokemonDetails } from './components/PokemonDetails/PokemonDetails';


export const App = () => {




  return (

    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetails  />} />
      </Routes>
    </div>

  );
}


