import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Vacation from "../../../model/Vacations/Vacation";
import { userIsAdmin } from "../../../Utils/authenticatin";
import { changeLikesAction } from "../../../redux/userReducer";
import { UserState } from "../../../redux/userReducer";
import { deleteVacationAction } from "../../../redux/VacationReducer";

interface VacationProps {
  vacationData: Vacation;
}

function SingleVacation(props: VacationProps): JSX.Element {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isAdmin = userIsAdmin();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handleDelete = () => {
    // A function to delete the vacation the admin clicks on
    axios
      .delete(`http://localhost:4000/api/v1/vacations/delete/${props.vacationData.VacationCode}`)
      .then(() => {
        dispatch(deleteVacationAction(props.vacationData.VacationCode)); // Dispatch the action with the VacationCode
        setShowModal(false); // Hide the modal
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  const renderEditButton = () => {
    // a function to show or hide the button if the user is admin or not
    if (isAdmin) {
      return (
        <Button
          size="small"
          onClick={
            () => navigate(`/EditVacation/${props.vacationData.VacationCode}`) //navigates to the edit page with the vacation values
          }
        >
          Edit Vacation ✏️
        </Button>
      );
    }
    return null;
  };

  const renderDeleteButton = () => {
    //the modal to show the delete button
    if (isAdmin) {
      return (
        <Button size="small" onClick={() => setShowModal(true)}>
          Delete Vacation❌
        </Button>
      );
    }
    return null;
  };

  const UserCode: number = useSelector(
    (state: { allUsers: UserState }) => state.allUsers.users[0]?.UserCode
  );

  const likedVacations = useSelector(
    (state: { allUsers: UserState }) =>
      state.allUsers.users[0]?.likedVacations || []
  );

  useEffect(() => {
    // Check if the vacation is liked by the logged in user
    const isVacationLiked = likedVacations.includes(
      props.vacationData.VacationCode
    );
    setIsLiked(isVacationLiked);
  }, [likedVacations, props.vacationData.VacationCode]);

  const handleLike = () => {
    // a function to toggle between the like or unlike
    setIsLiked(!isLiked);
    const likedVacationId = props.vacationData.VacationCode;
    dispatch(changeLikesAction([likedVacationId]));

    const requestData = {
      UserCode,
      VacationCode: likedVacationId,
    };

    axios
      .post("http://localhost:4000/api/v1/likes/addLike", requestData)
      .then((response) => {
        console.log("userCode", UserCode);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderLikeButton = () => {
    //the like button
    if (!isAdmin) {
      return (
        <Button size="small" onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"} 💖
        </Button>
      );
    }
    return null;
  };

  const renderFormattedDate = (dateString: string) => {
    //change the date to dd/mm/yy
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="singleVacation">
      <div className="container">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            component="img"
            alt={props.vacationData.Destination}
            src={`http://localhost:4000/${props.vacationData.Img}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span>Destination: {props.vacationData.Destination}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span>Description: {props.vacationData.Description} </span>
              <br />
              <span>
                Starting Date:{" "}
                {renderFormattedDate(props.vacationData.StartDate)}
              </span>
              <br />
              <span>
                Ending Date: {renderFormattedDate(props.vacationData.EndDate)}
              </span>
              <br />
              <span>Price: {props.vacationData.Price} $</span>
              <br />
              <br />
              <span>Was liked by {props.vacationData.likes} 💖</span>
            </Typography>
          </CardContent>
          <CardActions>
            {renderEditButton()}
            {renderDeleteButton()}
            {renderLikeButton()}
            {showModal && (
              <div className="modal">
                <p>❗Are you sure you want to delete this vacation?❗</p>
                <Button size="small" onClick={handleDelete}>
                  🟢 Yes
                </Button>
                <Button size="small" onClick={() => setShowModal(false)}>
                  🔴 No
                </Button>
              </div>
            )}
          </CardActions>
        </Card>
      </div>
      <br />
      <br />
    </div>
  );
}

export default SingleVacation;
