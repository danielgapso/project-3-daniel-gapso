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
import { UserState, isLoggedInAction } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";

function Vacations(): JSX.Element {
  const navigate = useNavigate();
  const [localVacations, setLocalVacations] = useState<Vacation[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of vacations to display per page
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = userIsAdmin();


  const generateCSVContent = () => {
    const vacationsData = vacations.getState().allVacations.allVacations;
    // Create the header row
    const header = "Destination,Likes\n";
    // Create the data rows
    const rows = vacationsData
      .map((vacation) => {
        const { Destination, likes } = vacation;
        const likesCount = likes;
        console.log("likesCount", likesCount);
        return `${Destination},${likesCount}`;
      })
      .join("\n");
    // Combine header and data rows
    const csvContent = header + rows;
    return csvContent;
  };

  const createCSV = () => {
    //creates the csv file
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "vacations.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderAddButton = () => {
    //will show this buttons only when the logged user is admin
    if (isAdmin) {
      return (
        <div>
          <Button onClick={() => navigate(`/addVacation`)} id="addBtn">
            Add New Vacation ➕
          </Button>
          <Button onClick={createCSV} id="createCsvBtn">
            Create CSV 📄
          </Button>
          <Button onClick={() => navigate(`/VacationCharts`)}>Charts 📊</Button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    //get all the vacations stored in the data base
    if (vacations.getState().allVacations.allVacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:4000/api/v1/vacations/GetAllVacations")
        .then((response) => {
          vacations.dispatch(downloadVacationAction(response.data));
          setRefresh(true);
        });
    }
  }, [localVacations.length, dispatch]);

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
      `${state.allUsers.users[0]?.UserFirstName || ""} ${
        state.allUsers.users[0]?.UserLastName || ""
      }`
  );

  const currentDate = new Date(); //set current date to today

  const filteredVacations = localVacations
    .filter((vacation) => {
      const startDate = new Date(vacation.StartDate);

      if (showLikedOnly && showUpcomingOnly && showTodayOnly) {
        //show the filterd vacations by the users click
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
        //only show the liked vacations by the user
        return likedVacations.includes(Number(vacation.VacationCode));
      } else if (showUpcomingOnly) {
        //only sohw upcoming vacations
        return startDate > currentDate;
      } else if (showTodayOnly) {
        //only show the vacations that start today
        return startDate.toDateString() === currentDate.toDateString();
      } else {
        return true;
      }
    })
    .sort(
      //filter the vacations from the closest to the latest
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
