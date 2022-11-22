import { useRef } from "react";

import classes from "./NewCompetitionForm.module.css";

function NewCompetitionForm(props) {
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    props.onAddCompetition({
      title: enteredTitle,
      price: enteredPrice,
      description: enteredDescription,
      date: enteredDate,
    });
  };

  return (
    <div className={classes.form}>
      <div className={classes.container}>
        <div className={classes.title}>New Competition</div>
        <form onSubmit={submitHandler}>
          <div className={classes.userdetails}>
            <div className={classes.inputbox}>
              <span className={classes.details}>Title</span>
              <input type="text" ref={titleInputRef} maxLength={30} required />
            </div>
            <div className={classes.inputbox}>
              <span className={classes.details}>Price</span>
              <input
                type="number"
                ref={priceInputRef}
                required
                min={0}
                max={2000}
              />
            </div>
            <div className={classes.inputbox}>
              <span className={classes.details}>Description</span>
              <textarea
                rows="5"
                ref={descriptionInputRef}
                required
                minLength={8}
                maxLength={850}
              ></textarea>
            </div>
            <div className={classes.inputbox}>
              <span className={classes.details}>Date</span>
              <input type="date" ref={dateInputRef} required />
            </div>
          </div>
          <div>
            <button className={classes.btn}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCompetitionForm;
