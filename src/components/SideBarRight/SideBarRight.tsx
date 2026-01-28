import React from 'react'
import { CartItem, FavoriteItem, PokemonDetailsObject, PokemonFinalObject } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { PokemonEvolution } from '../PokemonEvolution/PokemonEvolution';
import "./SideBarRight.css"

interface SideBarRightProps {
  PokemonDetails: PokemonDetailsObject;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
  mainImage: string;
  setMainImage: React.Dispatch<React.SetStateAction<string>>;
  pokemon: PokemonFinalObject[] | undefined;
}


export const SideBarRight = ({
    PokemonDetails,
    cart,
    setCart,
    favorites,
    setFavorites,
    mainImage,
    setMainImage,
    pokemon
}: SideBarRightProps) => {


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
        setCart(prev => {
            const exists = prev.find(item => item.id === PokemonDetails.id);

            if (exists ) {
                return prev.map(item => 
                    item.id === PokemonDetails.id
                        ? { ...item, quantity: item.quantity && item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: PokemonDetails.id,
                    name: PokemonDetails.name,
                    image: PokemonDetails.images.One,
                    color:PokemonDetails.color,
                    isIntheCart: true,
                    price:PokemonDetails.price,
                    quantity: 1,                    
                }
            ];
        });
    };  
    
    console.log(PokemonDetails)

    return (
        <>
            <div className='name'>
                {PokemonDetails.name}

                <div onClick={handleFavoriteClick}>
                    {isFavorite ? <MdFavorite className='favoriteIcon_clicked'/> : <MdFavoriteBorder />}
                </div>
        
            </div>

            <PokemonEvolution
                mainImage={mainImage}
                setMainImage={setMainImage}
                PokemonDetails={PokemonDetails}

            />
            <div className='price'>Price ${PokemonDetails.price}</div>
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
                <button onClick={handleCart}>Add To Basket</button>
            </div>
        </>
    );
};
