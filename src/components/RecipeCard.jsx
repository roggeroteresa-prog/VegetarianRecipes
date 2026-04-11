import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeCard({ recipe }) {
  const favorites = useFavorites();

  // Se il contesto non è pronto, evita il crash
  if (!favorites) {
    return null;
  }

  const { isFavorite, toggleFavorite } = favorites;
  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(recipe);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.title} />
        <button
          className={`favorite-btn ${favorite ? "favorite-btn--active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Aggiungi ai preferiti"
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <h3>{recipe.title}</h3>
    </Link>
  );
}
