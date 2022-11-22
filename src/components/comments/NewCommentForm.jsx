import { useEffect, useRef } from "react";
import { addComment } from "../api";
import useHttp from "../use-http";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitCommentHandler = (event) => {
    event.preventDefault();
    const enteredComment = commentTextRef.current.value;
    sendRequest({ commentData: { text: enteredComment }, id: props.id });
    commentTextRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={submitCommentHandler}>
        {status === "pending" && <p>pending...</p>}
        <div className={classes.input}>
          <input
            type="text"
            minLength={2}
            maxLength={200}
            required
            ref={commentTextRef}
          />
        </div>
        <div className={classes.bttn}>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default NewCommentForm;
