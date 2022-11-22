import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleCompetition } from "../components/api";
import useHttp from "../components/use-http";
import CompetitionDetail from "../components/competitions/CompetitionDetail";

// const DUMMY_COMPS = [
//   {
//     id: 1,
//     title: "Monopoly",
//     price: 10,
//     description: "come play monopoly",
//     date: "2022-12-03",
//   },
//   {
//     id: 2,
//     title: "Soccer",
//     price: 12,
//     description: "come play soccer",
//     date: "2022-11-19",
//   },
// ];

function CompetitionDetailPage() {
  const params = useParams();

  const { id } = params;

  const {
    sendRequest,
    status,
    error,
    data: loadedComp,
  } = useHttp(getSingleCompetition, true);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  // const competition = DUMMY_COMPS.find(
  //   (competition) => competition.id === +params.id
  // );

  if (status === "pending") {
    return <h3>pending...</h3>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!loadedComp.title) {
    return <h3>No Competition Found!</h3>;
  }

  return (
    <>
      <CompetitionDetail
        title={loadedComp.title}
        price={loadedComp.price}
        description={loadedComp.description}
        date={loadedComp.date}
        id={loadedComp.id}
        key={loadedComp.id}
      />
    </>
  );
}

export default CompetitionDetailPage;
