import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-hero">
      <h1>Ricette Vegetariane</h1>
      <p>Scopri piatti freschi, sani e deliziosi da tutto il mondo.</p>

      <div className="hero-search">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}
