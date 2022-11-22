import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCompetiton } from "../components/api";
import NewCompetitionForm from "../components/competitions/NewCompetitionForm";
import useHttp from "../components/use-http";

function NewCompetition(props) {
  const { sendRequest, status } = useHttp(addCompetiton);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/competitions");
    }
  }, [status, navigate]);

  const addCompetitionHandler = (compData) => {
    sendRequest(compData);
    console.log(compData);
  };

  return (
    <div>
      <NewCompetitionForm onAddCompetition={addCompetitionHandler} />
    </div>
  );
}

export default NewCompetition;
