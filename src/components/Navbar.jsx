import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
           🌿 Vegetarian recipe
      </Link>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/favorites">Preferiti</NavLink>
      </nav>
    </header>
  );
}
