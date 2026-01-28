import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, FavoriteItem, Pokemon, PokemonDetailsObject, PokemonFinalObject } from "../type/appTypes";
import { getPokemon } from "../hooks/getPokemon";
import { getPokemonDetails } from "../hooks/getPokemonDetails";


type AppContextType = {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
    shoppingCartValue: number;
    setShoppingCartValue: React.Dispatch<React.SetStateAction<number>>;
    mainImage: string;
    setMainImage: React.Dispatch<React.SetStateAction<string>>;
    pokemon: PokemonFinalObject[] | undefined;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    allFiltersClicked: boolean;
    setAllFiltersClicked: React.Dispatch<React.SetStateAction<boolean>>

};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [shoppingCartValue, setShoppingCartValue] = useState<number>(0);
    const [mainImage, setMainImage] = useState<string>("");
    const [pokemon, setPokemon] = useState<PokemonFinalObject[]>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [allFiltersClicked, setAllFiltersClicked] = useState<boolean>(false);




    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await getPokemon(pageNumber);

                const pokemonWithPrice: PokemonFinalObject[] = data.map(p => ({
                    ...p,
                }));

                setPokemon(prev =>
                    pageNumber === 1
                        ? pokemonWithPrice
                        : [...(prev ?? []), ...pokemonWithPrice]
                );
            } catch (err) {
                console.error("Error fetching Pokemon:", err);
            }
        };

        fetchPokemon();
    }, [pageNumber]);


    return (
        <AppContext.Provider
            value={{
                cart,
                setCart,
                favorites,
                setFavorites,
                shoppingCartValue,
                setShoppingCartValue,
                mainImage,
                setMainImage,
                pokemon,
                pageNumber,
                setPageNumber,
                allFiltersClicked,
                setAllFiltersClicked,
                
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used inside AppProvider");
    return context;
};
