// App.tsx
import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { Pokemon } from './components/Pokemon/Pokemon';
import { PokemonProductPage } from './components/PokemonProductPage/PokemonProductPage';
import { PokemonFavorites } from './components/PokemonFavorites/PokemonFavorites';
import { Basket } from './components/Basket/Basket';
import { Search } from './components/Search/Search';
import './App.css';

export const App = () => {
  // const [pageNumber, setPageNumber] = useState<number>(1);
  // const [pokemon, setPokemon] = useState<PokemonFinalObject[]>();



  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

     
        <Route path="/pokemon" element={<Pokemon/>} />

     
        <Route path="/pokemon/:id" element={<PokemonProductPage />} />
        <Route path="/:page/:id" element={<PokemonProductPage />} />

    
        <Route path="/basket" element={<Basket />} />

       
        <Route path="/favorites" element={<PokemonFavorites />} />

    
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};
