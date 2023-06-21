import React, { useEffect, useState } from "react";
import "./Vacations.css";
import axios from "axios";
import SingleVacation from "../AddVacation/singleVacation/singleVacation";
import Vacation from "../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";
import { downloadVacationAction } from "../../redux/VacationReducer";
import { vacations } from "../../redux/VacationStore";
import Button from "@mui/material/Button";
import { userIsAdmin } from "../../Utils/authenticatin";
import {
  UserState,
  isLoggedInAction,
  downloadUsersAction,
} from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";

function Vacations(): JSX.Element {
  const navigate = useNavigate();
  const [localVacations, setLocalVacations] = useState<Vacation[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = userIsAdmin();

  useEffect(() => {
    dispatch(isLoggedInAction(true));
  }, []);

  const renderAddButton = () => {
    if (isAdmin) {
      return (
        <Button onClick={() => navigate(`/addVacation`)} id="addBtn">
          Add New Vacation ➕
        </Button>
      );
    }
    return null;
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const likedVacations = useSelector(
    (state: { allUsers: UserState }) =>
      state.allUsers.users[0]?.likedVacations || []
  );

  const currentUser = useSelector(
    (state: { allUsers: UserState }) =>
      `${state.allUsers.users[0]?.UserFirstName || ""} ${state.allUsers.users[0]?.UserLastName || ""}`
  );
  

  const currentDate = new Date();

  const filteredVacations = localVacations
    .filter((vacation) => {
      const startDate = new Date(vacation.StartDate);

      if (showLikedOnly && showUpcomingOnly && showTodayOnly) {
        return (
          likedVacations.includes(Number(vacation.VacationCode)) &&
          startDate > currentDate &&
          startDate.toDateString() === currentDate.toDateString()
        );
      } else if (showLikedOnly && showUpcomingOnly) {
        return (
          likedVacations.includes(Number(vacation.VacationCode)) &&
          startDate > currentDate
        );
      } else if (showLikedOnly && showTodayOnly) {
        return (
          likedVacations.includes(Number(vacation.VacationCode)) &&
          startDate.toDateString() === currentDate.toDateString()
        );
      } else if (showUpcomingOnly && showTodayOnly) {
        return (
          startDate > currentDate &&
          startDate.toDateString() === currentDate.toDateString()
        );
      } else if (showLikedOnly) {
        return likedVacations.includes(Number(vacation.VacationCode));
      } else if (showUpcomingOnly) {
        return startDate > currentDate;
      } else if (showTodayOnly) {
        return startDate.toDateString() === currentDate.toDateString();
      } else {
        return true;
      }
    })
    .sort(
      (a, b) =>
        new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime()
    );

  const currentItems = filteredVacations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="Vacations">
      <p>Hello, {currentUser}!</p>
      {renderAddButton()}
      <div className="container">
        {currentItems.map((item) => (
          <SingleVacation key={item.VacationCode} vacationData={item} />
        ))}
      </div>
      {!isAdmin && (
        <>
          
          <label>
            Show Liked Vacations Only: 💖
            <input
              type="checkbox"
              checked={showLikedOnly}
              onChange={() => setShowLikedOnly(!showLikedOnly)}
            />
          </label>
          <br />
          <br />
          <label>
            Show upcoming vacations only: ⬆️
            <input
              type="checkbox"
              checked={showUpcomingOnly}
              onChange={() => setShowUpcomingOnly(!showUpcomingOnly)}
            />
          </label>
          <br />
          <br />
          <label>
            Show vacations for today only: ⬇️
            <input
              type="checkbox"
              checked={showTodayOnly}
              onChange={() => setShowTodayOnly(!showTodayOnly)}
            />
          </label>
        </>
      )}
      <div className="pagination">
        ⬅️
        {Array.from({
          length: Math.ceil(filteredVacations.length / itemsPerPage),
        }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={pageNumber}
              className={`page-item${
                currentPage === pageNumber ? " active" : ""
              }`}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => paginate(pageNumber)}
              >
                <span className="pagination-arrow"> {pageNumber} </span>
              </a>
            </span>
          );
        })}
        ➡️
      </div>
    </div>
  );
}

export default Vacations;
