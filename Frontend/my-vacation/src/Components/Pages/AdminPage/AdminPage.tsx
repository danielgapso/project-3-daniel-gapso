import { useEffect, useState } from "react";
import "./AdminPage.css";
import axios from "axios";

function AdminPage(): JSX.Element {
  const [vacations, setvaCations] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/vacations/GetAllVacations")
      .then((res) => setvaCations(res.data));
  }, []);
  return (
    <div className="AdminPage">
      <div className="Container">
        {vacations.map((item) => (
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

export default AdminPage;
