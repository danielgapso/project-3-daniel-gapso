import "./singleVacation.css";
import "../../../model/Vacations/Vacation";
import Vacation from "../../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface VacationProps {
  vacationData: Vacation;
}

function SingleVacation(props: VacationProps): JSX.Element {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
      axios.delete(
        `http://localhost:4000/api/v1/vacations/delete/${props.vacationData.VacationCode}`
      );
      setShowModal(false);
    };

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
                <button onClick={() => setShowModal(true)}>❌</button>
        {showModal && (
          <div className="modal">
            <p>Are you sure you want to delete this vacation?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default SingleVacation;
