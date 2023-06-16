import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import axios from "axios";
import SingleVacation from "../AddVacation/singleVacation/singleVacation";
import Vacation from "../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";
import { downloadVacationAction } from "../../redux/VacationReducer";
import { vacations } from "../../redux/VacationStore";

function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  const [localVacations, setLocalVacations] = useState<Vacation[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

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

  // Calculate the index of the last item for the current page
  const indexOfLastItem = currentPage * itemsPerPage;

  // Calculate the index of the first item for the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current items to display on the current page
  const currentItems = localVacations.slice(indexOfFirstItem, indexOfLastItem);

  // Change the page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="AdminPage">
      <button onClick={() => navigate(`/addVacation`)}>Add New Vacation</button>
      <div className="container"></div>
      {currentItems.map((item) => (
        <SingleVacation key={item.VacationCode} vacationData={item} />
      ))}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(localVacations.length / itemsPerPage) }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={pageNumber}
              className={`page-item${currentPage === pageNumber ? " active" : ""}`}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AdminPage;
