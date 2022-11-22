import classes from "./welcome.module.css";

function Welcome() {
  return (
    <div className={classes.container}>
      <h1>Welcome to the Competitions App</h1>
      <p>A great place to discover and enjoy competitions in your community!</p>
    </div>
  );
}

export default Welcome;
