import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Vacation from "../../../model/Vacations/Vacation";
import { userIsAdmin } from "../../../Utils/authenticatin";
import { isLoggedInAction } from "../../../redux/userReducer";
import { changeLikesAction } from "../../../redux/userReducer";
import { UserState } from "../../../redux/userReducer";


interface VacationProps {
  vacationData: Vacation;
}

function SingleVacation(props: VacationProps): JSX.Element {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isAdmin = userIsAdmin();
  const dispatch = useDispatch();
  dispatch(isLoggedInAction(true));
  const [isLiked, setIsLiked] = useState(false);

  console.log("isAdmin:", isAdmin); // Add this console log to check the isAdmin value

  const handleDelete = () => {
    axios.delete(
      `http://localhost:4000/api/v1/vacations/delete/${props.vacationData.VacationCode}`
    );
    setShowModal(false);
  };

  const renderEditButton = () => {
    if (isAdmin) {
      return (
        <Button
          size="small"
          onClick={() =>
            navigate(`/EditVacation/${props.vacationData.VacationCode}`)
          }
        >
          Edit Vacation
        </Button>
      );
    }
    return null;
  };

  const renderDeleteButton = () => {
    if (isAdmin) {
      return (
        <Button size="small" onClick={() => setShowModal(true)}>
          ❌
        </Button>
      );
    }
    return null;
  };



  const UserCode: number = useSelector(
    (state: { allUsers: UserState }) => state.allUsers.users[0]?.UserCode || 0
  );


  const handleLike = () => {
    setIsLiked(!isLiked);
    const likedVacationId = parseInt(
      props.vacationData.VacationCode || "0",
      10
    );
    dispatch(changeLikesAction([likedVacationId]));
    console.log ("likedVacationId", likedVacationId);

   
    const requestData = {
      "UserCode": Number(UserCode),
      "VacationCode": likedVacationId,
    };
    axios
      .post("http://localhost:4000/api/v1/likes/addLike",  requestData)
      .then((response) => {
        console.log("userCode", UserCode);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderLikeButton = () => {
    if (!isAdmin) {
      return (
        <Button size="small" onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"} 💖
        </Button>
      );
    }
    return null;
  };

  console.log(typeof(UserCode));

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
              {props.vacationData.Destination}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.vacationData.Description} <br />
              {props.vacationData.StartDate}
              <br />
              {props.vacationData.EndDate}
              <br />
              {props.vacationData.Price}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            {renderEditButton()}
            {renderDeleteButton()}
            {renderLikeButton()}
            {showModal && (
              <div className="modal">
                <p>Are you sure you want to delete this vacation?</p>
                <Button size="small" onClick={handleDelete}>
                  Yes
                </Button>
                <Button size="small" onClick={() => setShowModal(false)}>
                  No
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
