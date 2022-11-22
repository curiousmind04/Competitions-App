import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addFavorite, getAllFavCompetitions } from "../api";
import { FavoritesContext } from "../store/context";
import useHttp from "../use-http";
import useHttps from "../use-https";
import classes from "./CompetitionDetail.module.css";

const CompetitionDetail = (props) => {
  const favCtx = useContext(FavoritesContext);
  const params = useParams();
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addFavorite);
  const {
    sendRequests,
    statuses,
    datas: loadedFavComps,
  } = useHttps(getAllFavCompetitions);

  const { id } = params;

  const url = window.location.pathname;

  useEffect(() => {
    sendRequests();
  }, [sendRequests]);

  if (statuses === "completed" && loadedFavComps.length > 0) {
    loadedFavComps.map(
      (loadedFavComp) =>
        !favCtx.favorites.includes(loadedFavComp.page) &&
        favCtx.favorites.push(loadedFavComp.page)
    );
  }

  const hideCommentsHandler = () => {
    navigate(`/competitions/${id}`);
  };

  async function deleteCompetitionHandler() {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DOMAIN}/comments/${params.id}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete comment.");
    }
    const responses = await fetch(
      `${process.env.REACT_APP_FIREBASE_DOMAIN}/competitions/${params.id}.json`,
      {
        method: "DELETE",
      }
    );
    const datas = await responses.json();

    if (!responses.ok) {
      throw new Error(datas.message || "Could not delete comment.");
    }
    navigate(`/competitions`);
  }

  useEffect(() => {
    if (status === "completed") {
      navigate("/favorites");
    }
  }, [status, navigate]);

  const addFavoriteHandler = () => {
    favCtx.addTheFavorite(id);
    const compData = {
      title: props.title,
      price: props.price,
      description: props.description,
      date: props.date,
      page: props.id,
    };
    sendRequest(compData);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.top}>
          <div>{props.title}</div>
          {!favCtx.itemIsFavorite(id) && (
            <button onClick={deleteCompetitionHandler}>
              Delete Competition
            </button>
          )}
        </div>
        <div className={classes.price}>
          <p>${props.price}</p>
        </div>
        <div className={classes.date}>
          <p>{props.date}</p>
        </div>
        <div className={classes.description}>
          <p>{props.description}</p>
        </div>
        <div className={classes.btn}>
          {!favCtx.itemIsFavorite(id) && (
            <button type="button" onClick={addFavoriteHandler}>
              Favorite &#10084;
            </button>
          )}
        </div>
      </div>
      <div className={classes.comments}>
        {!url.includes("comments") && <Link to="comments">Show Comments</Link>}
      </div>
      <div className={classes.comments}>
        {url.includes("comments") && (
          <button onClick={hideCommentsHandler}>Hide Comments</button>
        )}
      </div>
    </>
  );
};

export default CompetitionDetail;
