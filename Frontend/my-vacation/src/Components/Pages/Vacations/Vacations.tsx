import { useEffect, useState } from "react";
import "./Vacations.css";
import axios from "axios";
import { vacations } from "../../redux/VacationStore";
import { downloaVacationAction } from "../../redux/VacationReducer";

function Vacations(): JSX.Element {

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {

    if (vacations.getState().allVacations.allVacations.length<1) {
      console.log("getting data from backend....");
      axios.get("http://localhost:4000/api/v1/vacations/GetAllVacations").then((response) => {
        vacations.dispatch(downloaVacationAction(response.data));
        setRefresh(false);
      });
    }
  }, []);

  return (
    <div className="Vacations">
      <div className="Container">

        {vacations.getState().allVacations.allVacations.map((item) => (
          <div key={item["VacationCode"]} className="VacationCard">
            <span>{item["Destination"]}</span>
            <br />
            <span>{item["Description"]}</span>
            <br />
            <span>{item["Img"]}</span>
            <br />
            <span>{item["StartDate"]}</span>
            <br />
            <span>{item["EndDate"]}</span>
            <br />
            <span>{item["Price"]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vacations;
