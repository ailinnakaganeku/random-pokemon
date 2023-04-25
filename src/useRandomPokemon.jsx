import { useState } from "react";

export function useRandomPokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateRandomPokemon() {
    setIsLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      const randomPokemon =
        data.results[Math.floor(Math.random() * data.results.length)];
      const pokemonResponse = await fetch(randomPokemon.url);
      const pokemonData = await pokemonResponse.json();
      setPokemon(pokemonData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  return [pokemon, isLoading, error, generateRandomPokemon];
}
