import { useNavigate, useParams } from "react-router-dom";
import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;

  async function deleteSingleCommentHandler() {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DOMAIN}/comments/${id}/${props.id}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete comment.");
    }
    navigate(`/competitions/${id}`);
  }

  return (
    <div className={classes.container}>
      <li id={props.id} className={classes.item}>
        <p>{props.text}</p>
        <div onClick={deleteSingleCommentHandler}>&#x1D5EB;</div>
      </li>
    </div>
  );
};

export default CommentItem;
