import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import Home from "./pages/Home";
import Results from "./pages/Results";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter basename="/VegetarianRecipes">
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
