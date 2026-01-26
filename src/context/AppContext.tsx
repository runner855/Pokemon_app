import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, FavoriteItem, PokemonFinalObject } from "../type/appTypes";
import { getPokemon } from "../hooks/getPokemon";

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
    setPageNumber: React.Dispatch<React.SetStateAction<number>>

};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [shoppingCartValue, setShoppingCartValue] = useState<number>(0);
    const [mainImage, setMainImage] = useState<string>("");
    const [pokemon, setPokemon] = useState<PokemonFinalObject[]>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon(pageNumber);
        setPokemon(prev => (pageNumber === 1 ? data : [...(prev ?? []), ...data]));
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
                setPageNumber
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
