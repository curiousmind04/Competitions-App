import Competition from "./Competition";

function CompetitionsList(props) {
  return (
    <div>
      <ul>
        {props.competitions.map((competition) => (
          <Competition
            key={competition.id}
            id={competition.id}
            title={competition.title}
            price={competition.price}
            description={competition.description}
            date={competition.date}
          />
        ))}
      </ul>
    </div>
  );
}

export default CompetitionsList;
