import React, { useEffect, useState } from 'react';
import "./PokemonProductPage.css";
import { FavoriteItem, PokemonDetailsObject } from '../../type/appTypes';
import { SideBarLeft } from '../SideBarLeft/SideBarLeft';
import { SideBarRight } from '../SideBarRight/SideBarRight';
import { useParams } from "react-router-dom";
import { getPokemonDetails } from '../../hooks/getPokemonDetails';
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';

interface IPokemonProductPage {
    cart: string[];
    setCart: React.Dispatch<React.SetStateAction<never[]>>,
    shoppingCartValue: number,
    setShoppingCartValue: React.Dispatch<React.SetStateAction<number>>,
    favorites: FavoriteItem[];
setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>

}


export const PokemonProductPage: React.FC<IPokemonProductPage> = ({
    cart,
    setCart,
    shoppingCartValue,
    setShoppingCartValue,
    favorites,
    setFavorites
}) => {

    const params = useParams();

    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsObject | null>(null);


    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemonData = await getPokemonDetails(Number(params.id));
                setPokemonDetails(pokemonData);
                console.log(pokemonDetails)
            } catch (error) {
                console.error("Error fetching Pokemon:", error);
            }
        };

        fetchPokemonDetails();
    }, [params.id]);

    return (
        <div className='principal_container'>
            <div className='container_left'>
                <SideBarLeft PokemonDetails={pokemonDetails} />
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
                />
            </div>
        </div>
    );
}
