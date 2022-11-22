import { useContext, useEffect } from "react";
import { getAllFavCompetitions } from "../components/api";
import FavoritesList from "../components/favorites/FavoritesList";
import { FavoritesContext } from "../components/store/context";
import useHttp from "../components/use-http";

function Favorites() {
  const favCtx = useContext(FavoritesContext);

  const {
    sendRequest,
    status,
    data: loadedFavComps,
    error,
  } = useHttp(getAllFavCompetitions, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <h3>pending...</h3>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedFavComps || loadedFavComps.length === 0)
  ) {
    return <h3>No competitions found! Add a competition to your favorites!</h3>;
  }

  if (status === "completed" && loadedFavComps.length > 0) {
    loadedFavComps.map(
      (loadedFavComp) =>
        !favCtx.favorites.includes(loadedFavComp.page) &&
        favCtx.favorites.push(loadedFavComp.page)
    );
  }

  return <FavoritesList competitions={loadedFavComps} />;
}

export default Favorites;
