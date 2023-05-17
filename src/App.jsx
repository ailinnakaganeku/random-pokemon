import { useState, useEffect } from "react";
import { useRandomPokemon } from "./useRandomPokemon";

function App() {
  const [pokemon, isLoading, error, generateRandomPokemon] = useRandomPokemon();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    generateRandomPokemon();
  }, []);

  function handleClick() {
    generateRandomPokemon();
  }

  function handleToggle() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <div
      className={`bg-${
        isDarkMode ? "gray-800" : "gray-100"
      } w-screen h-screen flex flex-col justify-center items-center transition-colors duration-500`}
    >
      <div
        className={`max-w-md w-full  bg-${
          isDarkMode ? "gray-800" : "white"
        } shadow-md rounded-md p-4 transition-colors duration-500`}
      >
        <div className="flex justify-end items-center mt-4 mb-2">
          <span className="mr-2">🌞</span>
          <label
            htmlFor="dark-mode-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                className="sr-only"
                checked={isDarkMode}
                onChange={handleToggle}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform duration-300 ${
                  isDarkMode ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
          </label>
          <span className=" ml-2">🌚</span>
        </div>
        <h1
          className={`text-2xl font-bold mb-4 text-center ${
            !isDarkMode ? "text-gray-800" : "text-white"
          }`}
        >
          Random Pokemon
        </h1>
        <div className="flex justify-center items-center">
          <button
            className={`bg-blue-500  hover:bg-blue-600 text-white	font-bold py-2 px-4 rounded-md mb-4  transition-colors duration-500 ${
              isLoading && "opacity-50 cursor-not-allowed "
            }`}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Random Pokemon"}
          </button>
        </div>
        {error && (
          <p className="text-center text-red-500 mb-4">
            Failed to generate random pokemon. Please try again later.
          </p>
        )}
        {pokemon ? (
          <div className="text-center">
            <h2
              className={`text-lg font-bold mb-2 ${
                !isDarkMode ? "text-gray-800" : "text-white"
              }`}
            >
              {pokemon.name}
            </h2>
            <img
              className="mx-auto mb-4"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
        ) : (
          <p
            className={`text-center ${
              !isDarkMode ? "text-gray-800" : "text-white"
            }`}
          >
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
