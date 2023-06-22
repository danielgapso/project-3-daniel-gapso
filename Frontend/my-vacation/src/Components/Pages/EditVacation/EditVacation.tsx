import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";

function EditVacation(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VacationFormValues>({
    defaultValues: {
      Destination: "",
      Description: "",
      StartDate: "",
      EndDate: "",
      Price: 0,
      Img: null,
    },
  });

  interface VacationFormValues {
    VacationCode: string;
    Destination: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    Price: number;
    Img: File | null;
  }

  const [Destination, setDestination] = useState("");
  const [Description, setDescription] = useState("");
  const [Img, setImg] = useState<File | null>(null);
  const [Price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [existingImg, setExistingImg] = useState("");

  const onSubmit = (data: VacationFormValues) => {
    //send the edited vacation
    AddEditVacation(data);
  };

  useEffect(() => {
    //get the vacation data by its code
    axios
      .get(
        `http://localhost:4000/api/v1/vacations/GetVacation/${params.VacationCode}`
      )
      .then((response) => {
        const vacation = response.data;

        // Set the form field values using the setValue function
        setValue("Destination", vacation.Destination);
        setValue("Description", vacation.Description);
        setValue("StartDate", vacation.StartDate);
        setValue("EndDate", vacation.EndDate);
        setValue("Price", vacation.Price);
        setValue("VacationCode", vacation.VacationCode);
        setExistingImg(vacation.Img);
        setStartDate(new Date(vacation.StartDate));
        setEndDate(new Date(vacation.EndDate));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.VacationCode, setValue]);

  const AddEditVacation = (data: VacationFormValues) => {
    //update the vacation by its new values
    const formData = new FormData();
    formData.append("Destination", data.Destination);
    formData.append("Description", data.Description);
    formData.append("StartDate", data.StartDate);
    formData.append("EndDate", data.EndDate);
    formData.append("Price", data.Price.toString());
    formData.append("VacationCode", data.VacationCode);
    if (Img) {
      formData.append("Img", Img);
    }

    axios
      .put(
        `http://localhost:4000/api/v1/vacations/UpdateVacation/${params.VacationCode}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        navigate("/Vacations");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //upload the img
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  return (
    <div className="EditVacation">
      <div className="box">
        <h2>Edit Vacation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <p>Destination</p>
          <TextField
            type="text"
            required
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
          <p>Description</p>
          <TextField
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
          <p>Start Date</p>
          <TextField
            type="date"
            required
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
            <p className="error-message">Start Date is required</p>
          )}
          <br />
          <br />
          <p>End Date</p>
          <TextField
            type="date"
            required
            inputProps={{
              min: startDate
                ? startDate.toISOString().split("T")[0] //end date can not be prior to start date
                : new Date().toISOString().split("T")[0], //end date can not be prior to today
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
            label="price"
            inputProps={{
              min: 0,
              max: 10000,
              step: 1,
              onInput: (e) => {
                const value = (e.target as HTMLInputElement).valueAsNumber;
                if (value < 0) {
                  (e.target as HTMLInputElement).value = "0"; //min value is 0
                } else if (value > 10000) {
                  (e.target as HTMLInputElement).value = "10000"; //min value is 10000
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
            <p className="error-message">Price is required</p>
          )}
          <br />
          <br />
          <p>Image</p>
          {existingImg && (
            <img
              src={`http://localhost:4000/${existingImg}`}
              alt="Vacation"
              width={200}
            /> //shown the existing img
          )}
          <input type="file" onChange={handleImageChange} required />
          {errors.Img?.type === "required" && (
            <p className="error-message">Image is required</p>
          )}
          <br />
          <br />
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button color="primary" type="submit">
              Update Vacation
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

export default EditVacation;
