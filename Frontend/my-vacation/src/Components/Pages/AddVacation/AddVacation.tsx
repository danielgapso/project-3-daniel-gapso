import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, TextField } from "@mui/material";

function AddVacation() {
  const [Destination, setDestination] = useState("");
  const [Description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Price, setPrice] = useState(0);
  const [img, setImg] = useState<File | null>(null);

  const navigate = useNavigate();

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

  const onSubmit = (data: VacationFormValues) => {
    AddNewVacation(data);
  };

  useEffect(() => {
    if (StartDate && EndDate && StartDate > EndDate) {
      // If the end date is prior to the start date, reset the end date
      setEndDate("");
    }
  }, [StartDate, EndDate]);

  const AddNewVacation = (data: VacationFormValues) => {
    const formData = new FormData();
    formData.append("Destination", data.Destination);
    formData.append("Description", data.Description);
    formData.append("StartDate", data.StartDate);
    formData.append("EndDate", data.EndDate);
    formData.append("Price", data.Price.toString());
    if (img) {
      formData.append("Img", img);
    }

    axios
      .post("http://localhost:4000/api/v1/vacations/AddVacation", formData, {
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
      setImg(file);
    }
  };

  return (
    <div className="AddVacation">
      <div className="box">
        <h2>Add Vacation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            required
            label="Destination"
            {...register("Destination", {
              required: true,
            })}
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
          />
          {errors.Description?.type === "required" && (
            <p className="error-message">Description is needed</p>
          )}
          <br />
          <br />
          <Controller
            name="StartDate"
            control={control}
            rules={{ required: true }}
            defaultValue="" // Add a default value for the StartDate field
            render={({ field }) => (
              <TextField
                type="date"
                required
                placeholder="Start Date"
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
                value={field.value} // Use the value prop from the field object
                onChange={(e) => {
                  setStartDate(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.StartDate && (
            <p className="error-message">Start Date is needed</p>
          )}
          <br />
          <br />
          <Controller
            name="EndDate"
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                if (StartDate && value < StartDate) {
                  return "End Date cannot be prior to Start Date";
                }
                return true;
              },
            }}
            defaultValue="" // Add a default value for the EndDate field
            render={({ field }) => (
              <>
                <TextField
                  type="date"
                  required
                  placeholder="End Date"
                  inputProps={{
                    min: StartDate || new Date().toISOString().split("T")[0],
                  }}
                  value={field.value} // Use the value prop from the field object
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    field.onChange(e);
                  }}
                />
                {errors.EndDate && (
                  <p className="error-message">End Date is needed</p>
                )}
              </>
            )}
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
                  (e.target as HTMLInputElement).value = "0"; // Set the value to the minimum allowed value
                } else if (value > 10000) {
                  (e.target as HTMLInputElement).value = "10000"; // Set the value to the maximum allowed value
                }
              },
            }}
            placeholder="Price"
            {...register("Price", {
              required: true,
            })}
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

            <Button color="secondary" onClick={() => navigate("/Vacations")}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}

export default AddVacation;
