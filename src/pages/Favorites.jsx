import { useFavorites } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="page favorites">
      <h1>Ricette preferite</h1>
      {favorites.length === 0 && (
        <p>Non hai ancora aggiunto nessuna ricetta ai preferiti.</p>
      )}
      <div className="grid">
        {favorites.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
