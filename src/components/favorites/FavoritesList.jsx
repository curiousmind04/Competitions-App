import Favorite from "./Favorite";

function FavoritesList(props) {
  return (
    <div>
      <ul>
        {props.competitions.map((competition) => (
          <Favorite
            key={competition.id}
            id={competition.id}
            title={competition.title}
            price={competition.price}
            description={competition.description}
            date={competition.date}
            page={competition.page}
          />
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
