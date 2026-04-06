import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchRecipes } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

export default function Results() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchRecipes(query)
      .then((res) => setRecipes(res.data.results || []))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="page results">
      <h2>Risultati per: {query}</h2>
      {loading && <Loader />}
      {!loading && recipes.length === 0 && (
        <p>Nessuna ricetta trovata. Prova con un’altra parola chiave.</p>
      )}
      <div className="grid">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
