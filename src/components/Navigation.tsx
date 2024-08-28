import { NavLink } from "react-router-dom";
import "../style/navigation.scss";
import logo from "/logo-medium.svg";

export const Navigation = () => (
  <nav className="navigation">
    {/* Logo och hem-länk */}
    <div className="logo-container">
      <NavLink to="/" end>
        <img src={logo} alt="the zoo logo" width={80} />
      </NavLink>
    </div>

    {/* Meny med länkar */}
    <div className="menu">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            <div>Hem</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            <div>Om Oss</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/animals"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            <div>Våra Djur</div>
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
