import React, { useEffect, useState } from 'react';
import { getEvolutionChain } from '../../hooks/getEvolutionChain';
import './PokemonEvolution.css';

interface PokemonEvolutionProps {
  pokemonId: number;
  mainImage: string;
  setMainImage: React.Dispatch<React.SetStateAction<string>>;
}

export const PokemonEvolution = ({
  pokemonId,
  mainImage,
  setMainImage,
}: PokemonEvolutionProps) => {
  const [pokemonEvolution, setPokemonEvolution] = useState<any>(null);

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const evolutionData = await getEvolutionChain(pokemonId);
        setPokemonEvolution(evolutionData);
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    };

    fetchEvolution();
  }, [pokemonId]);

  if (!pokemonEvolution) return null;

  return (
    <div className="evolution_main_container">
      <div className="evolution_count">
        {pokemonEvolution.EvolutionImages.length} Evolutions Available
      </div>

      <div className="evolution_images_container">
        {pokemonEvolution.EvolutionImages.map((item: any, index: number) => (
          <img
            key={index}
            className={`evolution_img ${
              mainImage === item.image ? 'active' : ''
            }`}
            src={item.image}
            alt="evolution"
            onClick={() => setMainImage(item.image)}
          />
        ))}
      </div>
    </div>
  );
};
