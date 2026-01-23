import React, { useEffect, useState } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { Pokemon } from './components/Pokemon/Pokemon';
import { PokemonProductPage } from './components/PokemonProductPage/PokemonProductPage';
import { PokemonFavorites } from './components/PokemonFavorites/PokemonFavorites';
import { CartItem, FavoriteItem, PokemonDetailsObject, PokemonFinalObject } from './type/appTypes';
import { Basket } from './components/Basket/Basket';
import { getPokemon } from './hooks/getPokemon';
import './App.css';
import { Search } from './components/Search/Search';


export const App = ({ PokemonDetails }: { PokemonDetails: PokemonDetailsObject | null }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [pokemon, setPokemon] = useState<PokemonFinalObject[]>();
  const [shoppingCartValue, setShoppingCartValue] = useState<number>(0);
  const [mainImage, setMainImage] = useState('');
  

   useEffect(() => {
  const fetchPokemon = async () => {
    try {
      const pokemonData = await getPokemon(pageNumber);

      setPokemon((prev) =>
        pageNumber === 1
          ? pokemonData
          : [...(prev ?? []), ...pokemonData]
      );
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  fetchPokemon();
}, [pageNumber]);

  

  return (

    <div className="App">
      <NavBar
        shoppingCartValue={shoppingCartValue}
        cart={cart}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon
          pokemon={pokemon}
          favorites={favorites}
          setFavorites={setFavorites}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />} />

        <Route path="/pokemon/:id" element={<PokemonProductPage
          cart={cart}
          setCart={setCart}
          shoppingCartValue={shoppingCartValue}
          setShoppingCartValue={setShoppingCartValue}
          favorites={favorites} setFavorites={setFavorites}
          mainImage={mainImage}
          setMainImage={setMainImage}
          
        />} />
        
        <Route path="/:page/:id" element={<PokemonProductPage
          cart={cart}
          setCart={setCart}
          shoppingCartValue={shoppingCartValue}
          setShoppingCartValue={setShoppingCartValue}
          favorites={favorites}
          setFavorites={setFavorites}
          mainImage={mainImage}
          setMainImage={setMainImage}
          
        />} />
        
        <Route path="/basket" element={<Basket
          shoppingCartValue={shoppingCartValue}
          setShoppingCartValue={setShoppingCartValue}
          favorites={favorites}
          setFavorites={setFavorites}
          cart={cart}
          setCart={setCart} />} />
        
        <Route path="/favorites" element={<PokemonFavorites
          favorites={favorites}
          setFavorites={setFavorites}
           />} />
        
        <Route path="/search" element={<Search/>}/>
    

      </Routes>
    </div>

  );
}


