import { Link } from "react-router-dom";

import classes from "./Competition.module.css";

function Competition(props) {
  return (
    <div className={classes.container}>
      <li className={classes.item}>
        <div className={classes.header}>
          <Link to={`/competitions/${props.id}`}>{props.title}</Link>
          <section className={classes.price}>${props.price}</section>
        </div>
        <div className={classes.date}>{props.date}</div>
        <p className={classes.description}>{`${props.description.slice(
          0,
          30
        )} ${"....."}`}</p>
      </li>
    </div>
  );
}

export default Competition;
