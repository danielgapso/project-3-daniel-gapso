import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import Vacation from "../../model/Vacations/Vacation";
import { useState } from "react";

function EditVacation(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();

  const [vacationData, SetVacationData] = useState<Vacation>();
  const [Description, setDescription] = useState(params.Description);
  const [Destination, setDestination] = useState(params.Destination);
  const [Img, setImg] = useState(params.Img);
  const [StartDate, setStartDate] = useState(params.StartDate);
  const [EndDate, setEndDate] = useState(params.EndDate);
  const [Price, setPrice] = useState(params.Price);

  return (
    <div className="EditVacation">
      <div className="box">
        <input
          type="text"
          onChange={(args) => setDescription(args.target.value)}
          value={Description}
        /><br/>
        <input
          type="text"
          onChange={(args) => setDestination(args.target.value)}
          value={Destination}
        /><br/>
        <input
          type="text"
          onChange={(args) => setImg(args.target.value)}
          value={Img}
        /><br/>
        <input
          type="text"
          onChange={(args) => setStartDate(args.target.value)}
          value={StartDate}
        /><br/>
        <input
          type="text"
          onChange={(args) => setEndDate(args.target.value)}
          value={EndDate}
        /><br/>
        <input
          type="text"
          onChange={(args) => setPrice(args.target.value)}
          value={Price}
        />
      </div>
    </div>
  );
}

export default EditVacation;
