import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchRecipes } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";

export default function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await searchRecipes(query);

        // Protezione contro errori API
        setResults(data?.results || []);
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    if (query) fetchData();
  }, [query]);

  if (loading) return <p>Caricamento...</p>;

  return (
    <div>
      <h2>Risultati per: {query}</h2>

      <div className="grid">
        {results.length > 0 ? (
          results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>Nessun risultato trovato.</p>
        )}
      </div>
    </div>
  );
}
