import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../api/spoonacular";
import Loader from "../components/Loader";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getRecipeDetails(id)
      .then((res) => setRecipe(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !recipe) return <Loader />;

  const favorite = isFavorite(recipe.id);

  return (
    <div className="page recipe-details">
      <div className="details-header">
        <h1>{recipe.title}</h1>
        <button
          className={`favorite-btn details-favorite ${
            favorite ? "favorite-btn--active" : ""
          }`}
          onClick={() =>
            toggleFavorite({
              id: recipe.id,
              title: recipe.title,
              image: recipe.image
            })
          }
        >
          {favorite ? "Rimuovi dai preferiti ♥" : "Aggiungi ai preferiti ♡"}
        </button>
      </div>

      <img src={recipe.image} alt={recipe.title} className="details-image" />

      <h2>Ingredienti</h2>
      <ul className="ingredients-list">
        {recipe.extendedIngredients?.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2>Preparazione</h2>
      {recipe.instructions ? (
        <div
          className="instructions"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      ) : (
        <p>Nessuna istruzione disponibile.</p>
      )}
    </div>
  );
}
