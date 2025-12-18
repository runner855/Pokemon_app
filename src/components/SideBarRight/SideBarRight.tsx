import React from 'react'
import { CartItem, FavoriteItem, PokemonDetailsObject } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { PokemonEvolution } from '../PokemonEvolution/PokemonEvolution';
import { useNavigate } from "react-router";
import "./SideBarRight.css"

interface SideBarRightProps {
    PokemonDetails: PokemonDetailsObject | null;
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
    shoppingCartValue: number,
    setShoppingCartValue: React.Dispatch<React.SetStateAction<number>>,
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>,
    mainImage: string;
    setMainImage: React.Dispatch<React.SetStateAction<string>>
   
    
    
}

export const SideBarRight = ({
    PokemonDetails,
    cart,
    setCart,
    shoppingCartValue,
    setShoppingCartValue,
    favorites,
    setFavorites,
    mainImage,
    setMainImage,
}: SideBarRightProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (shoppingCartValue !== undefined) {
            setShoppingCartValue(shoppingCartValue + 1);
        }
    };

    if (!PokemonDetails) return null;

    const isFavorite = favorites.some(f => f.id === PokemonDetails.id);

    const handleFavoriteClick = () => {
        setFavorites(prev => {
            const exists = prev.find(f => f.id === PokemonDetails.id);

            if (exists) {
                return prev.filter(f => f.id !== PokemonDetails.id);
            }

            return [
                ...prev,
                {
                    id: PokemonDetails.id,
                    name: PokemonDetails.name,
                    image: PokemonDetails.images.One,
                    favorite: true,
                    
                }
            ];
        });
    };


    const handleCart = () => {
        navigate(`/basket`);
        setCart(prev => {
            const exists = prev.find(f => f.id === PokemonDetails.id);

            if (exists ) {
                return prev.filter(f => f.id !== PokemonDetails.id);
            }

            return [
                ...prev,
                {
                    id: PokemonDetails.id,
                    name: PokemonDetails.name,
                    image: PokemonDetails.images.One,
                    color:PokemonDetails.color,
                    isIntheCart: true,
                    quantity: shoppingCartValue,
                  


                    
                }
            ];
        });
    };


    return (
        <>
            <div className='name'>
                {PokemonDetails.name}

                <div onClick={handleFavoriteClick}>
                    {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                </div>

                <FaShoppingBag onClick={handleCart} />
                {shoppingCartValue > 0 ? shoppingCartValue : ""}
            </div>

            <PokemonEvolution
                mainImage={mainImage}
                setMainImage={setMainImage}
                PokemonDetails={PokemonDetails}

            />

            <div className='height'>Height: {PokemonDetails.height}</div>
            <div className='weight'>Weight: {PokemonDetails.weight}</div>
            <div className='happiness'>Happiness: {PokemonDetails.happiness}</div>
            <div className='experience'>Experience: {PokemonDetails.experience}</div>
            <div className='capture_rate'>Capture Rate: {PokemonDetails.capture_rate}</div>
            <div className='color'>Color: {PokemonDetails.color?.toUpperCase()}</div>
            <div className='growth'>Growth Rate: {PokemonDetails.growth?.toUpperCase()}</div>
            <div className='habitat'>Habitat: {PokemonDetails.habitat?.toUpperCase()}</div>

            <div className='types'>
                Types: {PokemonDetails.types.join(", ")}
            </div>

            <div className='description'>
                Description: <p>{PokemonDetails.description}</p>
            </div>

            <div className='add_to_basket_btn'>
                <button onClick={handleClick}>Add To Basket</button>
            </div>
        </>
    );
};
