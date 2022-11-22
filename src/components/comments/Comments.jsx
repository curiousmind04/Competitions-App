import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllComments } from "../api";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../use-http";

import classes from "./Comments.module.css";

function Comments(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { id } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(id);
    setIsAddingComment(false);
  }, [sendRequest, id]);

  async function deleteCommentsHandler() {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DOMAIN}/comments/${params.id}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete comments.");
    }
    navigate(`/competitions/${id}`);
  }

  let comments;

  if (status === "pending") {
    comments = <p>pending...</p>;
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = (
      <>
        <CommentsList comments={loadedComments} />
        <div className={classes.delete}>
          <button onClick={deleteCommentsHandler}>Delete All Comments</button>
        </div>
      </>
    );
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = (
      <div className={classes.nocomment}>
        <p>No comments were added yet!</p>
      </div>
    );
  }
  return (
    <div>
      <div className={classes.title}>
        <h4>Comments</h4>
      </div>
      <div className={classes.add}>
        {!isAddingComment && (
          <button onClick={startAddCommentHandler}>Add Comment</button>
        )}
      </div>
      {isAddingComment && (
        <NewCommentForm id={params.id} onAddedComment={addedCommentHandler} />
      )}
      {comments}
    </div>
  );
}

export default Comments;
