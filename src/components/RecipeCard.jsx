import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorites = useFavorites();

if (!favorites) {
  return null; // evita il crash
}

const { isFavorite, toggleFavorite } = favorites;


  const handleFavoriteClick = (e) => {
    e.preventDefault(); // evita la navigazione quando clicchi il cuore
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
