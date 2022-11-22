import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      datas: null,
      errors: null,
      statuses: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      datas: action.responseData,
      errors: null,
      statuses: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      datas: null,
      errors: action.errorMessage,
      statuses: "completed",
    };
  }

  return state;
}

function useHttps(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    statuses: startWithPending ? "pending" : null,
    datas: null,
    errors: null,
  });

  const sendRequests = useCallback(
    async function (requestData) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequests,
    ...httpState,
  };
}

export default useHttps;
