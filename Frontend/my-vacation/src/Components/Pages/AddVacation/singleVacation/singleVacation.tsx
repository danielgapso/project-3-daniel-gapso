import "./singleVacation.css";
import "../../../model/Vacations/Vacation";
import Vacation from "../../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import * as React from 'react';
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

  const handleDelete = () => {
    axios.delete(
      `http://localhost:4000/api/v1/vacations/delete/${props.vacationData.VacationCode}`
    );
    setShowModal(false);
  };

  return (
    <div className="singleVacation">
      <div className="container">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            component="img" // Use the 'img' component instead of 'div'
            alt={props.vacationData.Destination} // Set the alt attribute for accessibility
            src={props.vacationData.Img} // Set the src attribute to the image URL
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
            <Button
              size="small"
              onClick={() =>
                navigate(`/EditVacation/
                ${props.vacationData.Description}/
                ${props.vacationData.Destination}/
                ${props.vacationData.Img}/
                ${props.vacationData.StartDate}/
                ${props.vacationData.EndDate}/
                ${props.vacationData.Price}
                `)}
            >
              Edit Vacation
            </Button>
            <Button size="small" onClick={() => setShowModal(true)}>
              ❌
            </Button>
            {showModal && (
              <div className="modal">
                <p>Are you sure you want to delete this vacation?</p>
                <Button size="small" onClick={handleDelete}>
                  Yes
                </Button>
                <Button
                  size="small"
                  onClick={() => setShowModal(false)}
                >
                  No
                </Button>
              </div>
            )}
          </CardActions>
        </Card>
      </div>
      <br /><br />
    </div>
  );
}

export default SingleVacation;