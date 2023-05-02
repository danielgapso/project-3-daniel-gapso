import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "./AddVacation.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Vacation from "../../model/Vacations/Vacation";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";

function AddVacation(): JSX.Element {
  const [Destination, setDestination] = useState("");
  const [Description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Price, setPrice] = useState(0);
  const [Img, setImg] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vacation>();

  const onSubmit = () => {
    AddNewVacation();
    navigate("/AdminPage");
  };

  const onSubmitClick = () => {
    if (Object.keys(errors).length > 0) {
      // if there are errors dont add vacation
      console.log(errors);
    } else {
      // no errors you can add vacation
      handleSubmit(onSubmit)();
    }
  };

  const DestinationSet = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setDestination(value);
  };
  const DescriptionSet = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setDescription(value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = +event.target.value;
    if (value < 0) {
      value = 0; // Set value to minimum if negative value entered
    } else if (value > 10000) {
      value = 10000; // Set value to maximum if greater than 10000
    }

    console.log("Price changed to:", value);
    setPrice(value);
  };

  const AddNewVacation = () => {
    const NewVacation = new Vacation(
      Destination,
      Description,
      StartDate,
      EndDate,
      Price,
      Img
    );

    axios
      .post("http://localhost:4000/api/v1/vacations/AddVacation", NewVacation)
      .then((res) => navigate("/AdminPage"));
  };

  const StartDateChange = (args: any) => {
    let startDate = args;
    console.log("Start Date: ", startDate);
    setStartDate(startDate);
  };
  const EndDateChange = (args: any) => {
    let startDate = args;
    console.log("End Date: ", startDate);
    setEndDate(startDate);
  };

  return (
    <div className="AddVacation">
      <div className="box">
        <h2>Add Vacation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            label="Destination"
            value={Destination}
            onChange={(e) => {
              setDestination(e.target.value);
              register("Destination", {
                required: true,
                value: e.target.value,
              });
            }}
            error={Boolean(errors.Destination)}
            helperText={errors.Destination && "Destination is required"}
          />
          <br />
          <br />
          <TextField
            required
            label="Description"
            multiline
            rows={4}
            onChange={DescriptionSet}
          />
          {errors.Description?.type === "required" && (
            <p className="error-message">Description is needed</p>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                onChange={(event) => StartDateChange(event)}
                disablePast
                format="DD/MM/YY"
              />  
              <DatePicker
                label="End Date"
                onChange={(event) => EndDateChange(event)}
                disablePast
                format="DD/MM/YY"
              />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              type="number"
              required
              inputProps={{ min: 0, max: 10000 }}
              value={Price}
              onChange={handlePriceChange}
            />
          </FormControl>
          <br />
          <br />
          <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
            <Button>Select Image</Button>
          </Box>
          <br />
          <br />
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button color="success" type="submit" onClick={onSubmitClick}>
              Add Vacation
            </Button>
            <Button color="error" onClick={() => navigate("/AdminPage")}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}

export default AddVacation;
