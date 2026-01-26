import React, { useEffect, useState } from 'react';
import "./PokemonProductPage.css";
import { CartItem, FavoriteItem, PokemonDetailsObject } from '../../type/appTypes';
import { SideBarLeft } from '../SideBarLeft/SideBarLeft';
import { SideBarRight } from '../SideBarRight/SideBarRight';
import { useParams } from "react-router-dom";
import { getPokemonDetails } from '../../hooks/getPokemonDetails';
import { useAppContext } from '../../context/AppContext';


export const PokemonProductPage = () => {

    const { cart, setCart, shoppingCartValue, setShoppingCartValue, favorites, setFavorites, mainImage, setMainImage} = useAppContext();

    const params = useParams();

    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsObject | null>(null);


    useEffect(() => {
    const fetchPokemonDetails = async () => {
        try {
            const pokemonData = await getPokemonDetails(Number(params.id));
            if (!pokemonData) return; 
            setPokemonDetails(pokemonData);

            setMainImage(pokemonData.images.One);
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
        }
    };

    fetchPokemonDetails();
    }, [params.id]);
    

    return (
        <div className='principal_container'>
            <div className='container_left'>
                <SideBarLeft
                    PokemonDetails={pokemonDetails}
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                />
            </div>

            <div className='sidebar_right'>
                <SideBarRight
                    PokemonDetails={pokemonDetails}
                    cart={cart}
                    setCart={setCart}
                    shoppingCartValue={shoppingCartValue}
                    setShoppingCartValue={setShoppingCartValue}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                />
            </div>
        </div>
    );
}
