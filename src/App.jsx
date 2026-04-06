import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
