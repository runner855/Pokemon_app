import React from 'react'
import { PokemonDetailsObject } from '../../type/appTypes';
import { GrFavorite } from "react-icons/gr";
import "./SideBarRight.css"

export const SideBarRight = ({ PokemonDetails }: { PokemonDetails: PokemonDetailsObject | null }) => {


    return (
        <>
            {PokemonDetails && 
                <div>
                    <div className='name'>{PokemonDetails.name}<GrFavorite /></div>
                    <div className='height'>Height: {PokemonDetails.height}</div>
                    <div className='weight'>Weight: {PokemonDetails.weight}</div>
                    <div className='happiness'>Happiness: {PokemonDetails.happiness}</div>
                    <div className='experience'>Experience: {PokemonDetails.experience}</div>
                    <div className='capture_rate'>Capture Rate: {PokemonDetails.capture_rate}</div>
                    <div className='color'>Color: {PokemonDetails.color.toUpperCase()}</div>
                    <div className='growth'>Growth Rate: {PokemonDetails.growth.toUpperCase()}</div>
                    <div className='habitat'>Habitat: {PokemonDetails.habitat.toUpperCase()}</div>
                    <div className='types'>Types: {`${PokemonDetails.types[0]}, ${PokemonDetails.types[1] === undefined ? '' : PokemonDetails.types[1]}`}</div>
                    <div className='description '>Description: <p>{PokemonDetails.description}</p></div>
                    <div className='add_to_basket_btn'><button>Add To Basket </button></div>

                </div>
            }
        </>
    );
}

