import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/competitions"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Competitions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-competition"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add New Competition
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
