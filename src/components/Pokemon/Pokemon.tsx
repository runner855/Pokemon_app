import React, { useEffect, useMemo, useState } from "react";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsSliders } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import "./Pokemon.css";
import { PokemonTypes } from "../../type/appTypes";
import { MultiRangeSlider } from "../MultiRangeSlider/MultiRangeSlider";

type FilterType =
    | "NONE"
    | "AZ"
    | "ZA"
    | "FAVORITES"
    | "Price(High to Low)"
    | "Price(Low to High)";

const ALL_POKEMON_TYPES: PokemonTypes[] = [
    "fire", "water", "grass", "electric", "ice", "dragon", "dark", "fairy",
    "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
    "ghost", "steel", "psychic",
];

export const Pokemon = () => {
    const {
        pokemon,
        favorites,
        setFavorites,
        pageNumber,
        setPageNumber,
        allFiltersClicked,
        setAllFiltersClicked,
        pokemonDetailsMap,
        fetchPokemonDetailsIfNeeded,
    } = useAppContext();

    const [filterOpen, setFilterOpen] = useState(false);
    const [filterDropDownOpen, setFilterDropDownOpen] = useState(false);
    const [filterDropDownPriceOpen, setFilterDropDownPriceOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterType>("NONE");
    const [selectedType, setSelectedType] = useState<PokemonTypes | null>(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    useEffect(() => {
        if (!pokemon) return;
        pokemon.forEach(p => fetchPokemonDetailsIfNeeded(p.id));
    }, [pokemon, fetchPokemonDetailsIfNeeded]);

    const displayedPokemon = useMemo(() => {
        if (!pokemon) return [];
        let result = [...pokemon];

        // Filter by type
        if (selectedType) {
            result = result.filter(p =>
                pokemonDetailsMap[p.id]?.types?.includes(selectedType)
            );
        }

        // Filter by price range
        result = result.filter(p => 
            p.price >= priceRange.min && p.price <= priceRange.max
        );

        // Sort based on active filter
        switch (activeFilter) {
            case "AZ":
                return result.sort((a, b) => a.name.localeCompare(b.name));
            case "ZA":
                return result.sort((a, b) => b.name.localeCompare(a.name));
            case "FAVORITES": {
                const favIds = new Set(favorites.filter(f => f.favorite).map(f => f.id));
                return result.filter(p => favIds.has(p.id));
            }
            case "Price(High to Low)":
                return result.sort((a, b) => b.price - a.price);
            case "Price(Low to High)":
                return result.sort((a, b) => a.price - b.price);
            default:
                return result;
        }
    }, [pokemon, favorites, activeFilter, selectedType, pokemonDetailsMap, priceRange]);

    const handleClearAll = () => {
        setSelectedType(null);
        setPriceRange({ min: 0, max: 1000 });
    };

    return (
        <>
            <div className="pokemon_title">Pokemon</div>

            <div className="filters_container">
                <div
                    className="filters_left"
                    onClick={() => setAllFiltersClicked(true)}
                >
                    <BsSliders />
                    All Filters
                </div>

                <div className="filters_right">
                    <span>{displayedPokemon.length} Results</span>

                    <div className="order_by_container">
                        <span>Order by:</span>
                        <span>{activeFilter === "NONE" ? "A–Z" : activeFilter}</span>
                        <div onClick={() => setFilterOpen(p => !p)}>
                            {filterOpen ? <SlArrowUp /> : <SlArrowDown />}
                        </div>

                        {filterOpen && (
                            <div className="dropdown">
                                <div onClick={() => setActiveFilter("AZ")} className="AZ">A–Z</div>
                                <div onClick={() => setActiveFilter("ZA")} className="ZA">Z–A</div>
                                <div onClick={() => setActiveFilter("FAVORITES")} className="favorites">Favorites</div>
                                <div onClick={() => setActiveFilter("Price(High to Low)")} className="pricehigh_low">Price(High to Low)</div>
                                <div onClick={() => setActiveFilter("Price(Low to High)")} className="pricelow_high">Price(Low to High)</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {allFiltersClicked && (
                <div className="allfilters_overlay" onClick={() => setAllFiltersClicked(false)}>
                    <div className="allfilters_options" onClick={e => e.stopPropagation()}>

                        <div className="filters_header">
                            <h2 className="filters_title">Filters</h2>
                            <button className="filters_close" onClick={() => setAllFiltersClicked(false)}>
                                <MdClear />
                            </button>
                        </div>

                        <div className="filters_scroll_body">
                            <div className="filter_section">
                                <div
                                    className="filter_type_container"
                                    onClick={() => setFilterDropDownOpen(p => !p)}
                                >
                                    <h3>Types</h3>
                                    {filterDropDownOpen ? <SlArrowUp /> : <SlArrowDown />}
                                </div>

                                {filterDropDownOpen && (
                                    <div className="type_filter_content">
                                        {ALL_POKEMON_TYPES.map(type => (
                                            <div
                                                key={type}
                                                className={`type_filter_item ${selectedType === type ? "active" : ""}`}
                                                onClick={() =>
                                                    setSelectedType(prev => (prev === type ? null : type))
                                                }
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="price_filters_scroll_body">
                                <div className="price_filter_section">
                                    <div
                                        className="filter_price_container"
                                        onClick={() => setFilterDropDownPriceOpen(!filterDropDownPriceOpen)}
                                    >
                                        <h3>Price</h3>
                                        {filterDropDownPriceOpen ? <SlArrowUp /> : <SlArrowDown />}
                                    </div>

                                    {filterDropDownPriceOpen && (
                                        <div className="price_filter_content">
                                            <MultiRangeSlider
                                                min={0}
                                                max={1000}
                                                onChange={(min, max) => setPriceRange({ min, max })}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="filters_bottom_buttons">
                            <button className="clearAll" onClick={handleClearAll}>
                                Clear All
                            </button>
                            <button
                                className="seeResults"
                                onClick={() => setAllFiltersClicked(false)}
                            >
                                See Results
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pokemon_container">
                {displayedPokemon.map(p => (
                    <PokemonCard
                        key={p.id}
                        pok={p}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        pokemonDetails={pokemonDetailsMap[p.id]}
                    />
                ))}
            </div>

            <div className="load_more_container">
                <p>
                    You have viewed {displayedPokemon.length} Pokémon of 1350
                </p>

                <div className="load_more" onClick={() => setPageNumber(p => p + 1)}>Load More Pokémon</div>
            </div>
        </>
    );
};