import { useEffect } from "react";
import { getAllCompetitions } from "../components/api";
import CompetitionsList from "../components/competitions/CompetitionsList";
import useHttp from "../components/use-http";

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

function Competitions() {
  const {
    sendRequest,
    status,
    data: loadedComps,
    error,
  } = useHttp(getAllCompetitions, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <h3>pending...</h3>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (status === "completed" && (!loadedComps || loadedComps.length === 0)) {
    return <h3>No competitions found! Add a new competition!</h3>;
  }

  return <CompetitionsList competitions={loadedComps} />;
}

export default Competitions;
