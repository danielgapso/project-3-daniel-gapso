import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import Vacation from "../../model/Vacations/Vacation";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";




function EditVacation(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<VacationFormValues>();

  type VacationFormValues = {
    Destination: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    Price: number;
    Img: FileList; // Define Img field as FileList type
  };


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

      <TextField
            type="text"
            required
            label="Destination"
            {...register("Destination", {
              required: true,
            })}
            value={Description}
          />
          {errors.Destination?.type === "required" && (
            <p className="error-message">Destination is needed</p>
          )}

        <TextField
          type="text"
          onChange={(args) => setDescription(args.target.value)}
          value={Description}
        /><br/>
        <TextField
          type="text"
          onChange={(args) => setDestination(args.target.value)}
          value={Destination}
        /><br/>
        <TextField
          type="text"
          onChange={(args) => setImg(args.target.value)}
          value={Img}
        /><br/>
        <TextField
          type="text"
          onChange={(args) => setStartDate(args.target.value)}
          value={StartDate}
        /><br/>
        <TextField
          type="text"
          onChange={(args) => setEndDate(args.target.value)}
          value={EndDate}
        /><br/>
        <TextField
          type="text"
          onChange={(args) => setPrice(args.target.value)}
          value={Price}
        />
      </div>
    </div>
  );
}

export default EditVacation;
