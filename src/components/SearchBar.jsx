import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Cerca ricette vegetariane..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Cerca</button>
    </form>
  );
}
