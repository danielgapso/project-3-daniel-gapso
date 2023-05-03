import "./singleVacation.css";
import "../../../model/Vacations/Vacation";
import Vacation from "../../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";

interface VacationProps {
  vacationData: Vacation;
}

function SingleVacation(props: VacationProps): JSX.Element {
    const navigate = useNavigate();

  return (
    <div className="singleVacation">
      <div className="container">
        <span>{props.vacationData.Description}</span>
        <br />
        <span>{props.vacationData.Destination}</span>
        <br />
        <span>{props.vacationData.Img}</span>
        <br />
        <span>{props.vacationData.StartDate}</span>
        <br />
        <span>{props.vacationData.EndDate}</span>
        <br />
        <span>{props.vacationData.Price}</span>
        <br />
        <button onClick={()=>
            navigate(`/EditVacation/
            ${props.vacationData.Description}/
            ${props.vacationData.Destination}/
            ${props.vacationData.Img}/
            ${props.vacationData.StartDate}/
            ${props.vacationData.EndDate}/
            ${props.vacationData.Price}
            `)}>
                Edit Vacation</button>
      </div>
      <br />
    </div>
  );
}

export default SingleVacation;
