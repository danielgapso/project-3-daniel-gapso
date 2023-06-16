import "./singleVacation.css";
import "../../../model/Vacations/Vacation";
import Vacation from "../../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface VacationProps {
  vacationData: Vacation;
}

function SingleVacation(props: VacationProps): JSX.Element {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

 
 

  return (
    <div className="singleVacation">
      <div className="container">
        <Card sx={{ maxWidth: 345 }}>
          
          <CardMedia
            sx={{ height: 140 }}
            component="img" // Use the 'img' component instead of 'div'
            alt={props.vacationData.Destination} // Set the alt attribute for accessibility
            src={`http://localhost:4000/${props.vacationData.Img}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.vacationData.Destination}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.vacationData.Description} <br/>
              {props.vacationData.StartDate}<br/>
              {props.vacationData.EndDate}<br/>
              {props.vacationData.Price}<br/>
            </Typography>
          </CardContent>
          <CardActions>
            
               💖 like
           

              
    
          </CardActions>
        </Card>
      </div>
      <br /><br />
    </div>
  );
}

export default SingleVacation;