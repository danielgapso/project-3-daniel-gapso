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
    Img: File | null;
  };

  const [vacationData, setVacationData] = useState<Vacation>();
  const [Destination, setDestination] = useState(params.Destination);
  const [Description, setDescription] = useState(params.Description);
  const [Img, setImg] = useState(params.Img);
  const [Price, setPrice] = useState(params.Price);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onSubmit = (data: VacationFormValues) => {
    AddEditVacation(data);
  };

  const AddEditVacation = (data: VacationFormValues) => {
    const formData = new FormData();
    formData.append("Destination", data.Destination);
    formData.append("Description", data.Description);
    formData.append("StartDate", data.StartDate);
    formData.append("EndDate", data.EndDate);
    formData.append("Price", data.Price.toString());
    if (Img) {
      formData.append("Img", Img);
    }

    axios
      .put("http://localhost:4000/api/v1/vacations/UpdateVacation", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/AdminPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImg(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(startDate, endDate);

  return (
    <div className="EditVacation">
      <div className="box">
        <h2>Edit Vacation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            required
            label="Destination"
            {...register("Destination", {
              required: true,
            })}
            defaultValue={Destination}
          />
          {errors.Destination?.type === "required" && (
            <p className="error-message">Destination is needed</p>
          )}
          <br />
          <br />
          <TextField
            label="Description"
            required
            {...register("Description", {
              required: true,
            })}
            defaultValue={Description}
          />
          {errors.Description?.type === "required" && (
            <p className="error-message">Description is needed</p>
          )}
          <br />
          <br />

        <TextField
  type="date"
  required
  placeholder="Start Date"
  inputProps={{
    min: new Date().toISOString().split("T")[0],
  }}
  {...register("StartDate", { required: true })}
  defaultValue={params.StartDate || ""}
  onChange={(e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(selectedDate);
    if (endDate && selectedDate > endDate) {
      setEndDate(null);
    }
  }}
/>
          {errors.StartDate && (
            <p className="error-message">Start Date is needed</p>
          )}
          <br />
          <br />
          <TextField
            type="date"
            required
            placeholder="End Date"
            inputProps={{
              min: startDate
                ? startDate.toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
            }}
            {...register("EndDate", {
              required: true,
              validate: (value) => {
                const endDateValue = new Date(value); // Convert value to Date object
                if (startDate && endDateValue < startDate) {
                  return "End Date cannot be prior to Start Date";
                }
                return true;
              },
            })}
            defaultValue={
              params.EndDate
                ? params.EndDate
                : endDate?.toISOString().split("T")[0]
            }
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              setEndDate(selectedDate);
            }}
          />
          <br />
          <br />
          <TextField
            type="number"
            required
            inputProps={{
              min: 0,
              max: 10000,
              step: 1,
              onInput: (e) => {
                const value = (e.target as HTMLInputElement).valueAsNumber;
                if (value < 0) {
                  (e.target as HTMLInputElement).value = "0";
                } else if (value > 10000) {
                  (e.target as HTMLInputElement).value = "10000";
                }
              },
            }}
            placeholder="Price"
            {...register("Price", {
              required: true,
            })}
            defaultValue={Price}
          />
          {errors.Price?.type === "required" && (
            <p className="error-message">Price is needed</p>
          )}
          <br />
          <br />
          <input type="file" onChange={handleImageChange} required />
          {errors.Img && <p className="error-message">Img is needed</p>}
          <br />
          <br />
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button color="primary" type="submit">
              Add Vacation
            </Button>
            <Button color="secondary" onClick={() => navigate("/AdminPage")}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}

export default EditVacation;
