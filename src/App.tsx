import React, { useEffect, useState } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { Pokemon } from './components/Pokemon/Pokemon';
import { PokemonProductPage } from './components/PokemonProductPage/PokemonProductPage';
import { PokemonFavorites } from './components/PokemonFavorites/PokemonFavorites';
import { PokemonDetailsObject, PokemonFinalObject } from './type/appTypes';
import { Basket } from './components/Basket/Basket';
import { getPokemon } from './hooks/getPokemon';
import './App.css';


export const App = ({ PokemonDetails }: { PokemonDetails: PokemonDetailsObject | null }) => {
  const [cart, setCart] = useState([]);
  const [pokemon, setPokemon] = useState<PokemonFinalObject[]>();
  const [shoppingCartValue, setShoppingCartValue] = useState<number>(0);
  

     useEffect(() => {
    const fetchPokemon = async () => {
      try {
          const pokemonData = await getPokemon(); 
          setPokemon(pokemonData as PokemonFinalObject[] | undefined);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
     }, []);
  

  return (

    <div className="App">
      <NavBar shoppingCartValue={shoppingCartValue}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon pokemon={pokemon} />} />
        <Route path="/pokemon/:id" element={<PokemonProductPage cart={cart} setCart={setCart} shoppingCartValue={shoppingCartValue} setShoppingCartValue={setShoppingCartValue} />} />
        <Route path="/favorites" element={<PokemonFavorites />} />
        {/* <Route path="/pokemon/:id/basket" element={<Basket  shoppingCartValue={0} cart={cart} setShoppingCartValue={setShoppingCartValue}/>
        <Route path="/favorites" element={<PokemonFavorites />} /> */}

      </Routes>
    </div>

  );
}


