import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../store/context";

import classes from "./Favorite.module.css";

function Favorite(props) {
  const navigate = useNavigate();
  const favCtx = useContext(FavoritesContext);

  async function deleteFavoriteHandler() {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DOMAIN}/favorites/${props.id}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Could not delete competition from favorites."
      );
    }
    favCtx.removeFavorite(props.page);
    navigate(`/competitions`);
  }

  return (
    <div className={classes.container}>
      <li className={classes.item}>
        <div className={classes.header}>
          <Link to={`/competitions/${props.page}`}>{props.title}</Link>
          <section className={classes.price}>${props.price}</section>
        </div>
        <div className={classes.date}>{props.date}</div>
        <p className={classes.description}>{`${props.description.slice(
          0,
          30
        )} ${"....."}`}</p>
        <button className={classes.unfav} onClick={deleteFavoriteHandler}>
          Unfavorite
        </button>
      </li>
    </div>
  );
}

export default Favorite;
