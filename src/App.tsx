import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import './App.css';
import { Pokemon } from './components/Pokemon/Pokemon';
import { PokemonDetails } from './components/PokemonDetails/PokemonDetails';
import { PokemonProductPage } from './components/PokemonProductPage/PokemonProductPage';
import { PokemonFavorites } from './components/PokemonFavorites/PokemonFavorites';
import { ShoppingBasket } from './components/ShoppingBasket/ShoppingBasket';
import { PokemonDetailsObject } from './type/appTypes';


export const App = ({ PokemonDetails }: { PokemonDetails: PokemonDetailsObject | null }) => {




  return (

    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonProductPage />} />
        <Route path="/pokemon/:id" element={<ShoppingBasket PokemonDetails={PokemonDetails} />} />
        <Route path="/favorites" element={<PokemonFavorites />} />

      </Routes>
    </div>

  );
}


