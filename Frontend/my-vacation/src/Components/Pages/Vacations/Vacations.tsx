import { useEffect, useState } from "react";
import "./Vacations.css";
import axios from "axios";
import { vacations } from "../../redux/VacationStore";
import { downloadVacationAction } from "../../redux/VacationReducer";
import { useNavigate } from "react-router-dom";
import Vacation from "../../model/Vacations/Vacation";
import SingleVacation from "../AddVacation/singleVacation/singleVacation";


function Vacations(): JSX.Element {
  const [localVacations, setLocalVacations] = useState<Vacation[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (vacations.getState().allVacations.allVacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:4000/api/v1/vacations/GetAllVacations")
        .then((response) => {
          vacations.dispatch(downloadVacationAction(response.data));
          setRefresh(true);
        });
    }
  }, []);

  useEffect(() => {
    setLocalVacations(vacations.getState().allVacations.allVacations);
  }, [refresh]);

  return (
    <div className="Vacations">
      {localVacations.map((item) => (
        <SingleVacation key={item.VacationCode} vacationData={item} />
      ))}
      
    </div>
  );
}

export default Vacations;
