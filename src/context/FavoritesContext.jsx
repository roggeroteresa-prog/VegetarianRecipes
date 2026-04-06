import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((r) => r.id === id);

  const addFavorite = (recipe) => {
    setFavorites((prev) =>
      isFavorite(recipe.id) ? prev : [...prev, recipe]
    );
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
