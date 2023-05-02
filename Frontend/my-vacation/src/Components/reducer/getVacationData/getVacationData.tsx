import "./getVacationData.css";
import { useReducer, useState } from "react";
import vacationReducer, { ACTION_TYPES, INITIAL_STATE } from "./VacatioReducer";

function GetVacationData(): JSX.Element {
  const [state, dispatch] = useReducer(vacationReducer, INITIAL_STATE);

  const handleFetch = () => {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    fetch("url")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      })
      .catch((err) => {;
        dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: err });
      });
  };

  return <div className="getVacationData">
      <button onClick={handleFetch}>
        {state.loading ? "Fetching data..." : "Click for search..."}
      </button>
      <span>{state.error.length > 1 && `Error:${state.error}`}</span>
  </div>;
}

export default GetVacationData;
