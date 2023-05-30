import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Vacation from "../../model/Vacations/Vacation";

function AddVacation() {
  const [Destination, setDestination] = useState("");
  const [Description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Price, setPrice] = useState(0);
  const [Img, setImg] = useState<File | null>(null); // Track the selected image file

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationFormValues>();

  type VacationFormValues = {
    Destination: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    Price: number;
    Img: FileList; // Define Img field as FileList type
  };

  const onSubmit = (data: VacationFormValues) => {
    AddNewVacation(data);
  };

  const onSubmitClick = () => {
    if (Object.keys(errors).length > 0) {
      console.log(errors);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]); // Store the selected image file
    }
  };

  const AddNewVacation = (data: VacationFormValues) => {
    const formData = new FormData();
    formData.append("Destination", data.Destination);
    formData.append("Description", data.Description);
    formData.append("StartDate", data.StartDate);
    formData.append("EndDate", data.EndDate);
    formData.append("Price", data.Price.toString());
    if (Img) {
      formData.append("Img", Img); // Append the image file to the FormData
    }

    axios
      .post("http://localhost:4000/api/v1/vacations/AddVacation", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for file upload
        },
      })
      .then((res) => {
        navigate("/AdminPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AddVacation">
      <div className="box">
        <h2>Add Vacation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            required
            placeholder="Destination"
            {...register("Destination", {
              required: true,
            })}
          />
          {errors.Destination?.type === "required" && (
            <p className="error-message">Destination is needed</p>
          )}
          <br /><br />
          <textarea
            required
            placeholder="Description"
            {...register("Description", {
              required: true,
            })}
          />
          {errors.Description?.type === "required" && (
            <p className="error-message">Description is needed</p>
          )}
          <br /><br />
          <input
            type="date"
            required
            placeholder="Start Date"
            min={new Date().toISOString().split("T")[0]}
            {...register("StartDate", {
              required: true,
            })}
          />
          {errors.StartDate?.type === "required" && (
            <p className="error-message">Start Date is needed</p>
          )}
          <br /><br />
          <input
            type="date"
            required
            placeholder="End Date"
            min={new Date().toISOString().split("T")[0]}
            {...register("EndDate", {
              required: true,
            })}
          />
          {errors.EndDate?.type === "required" && (
            <p className="error-message">End Date is needed</p>
          )}
          <br /><br />
          <input
            type="number"
            required
            min={0}
            max={10000}
            placeholder="Price"
            {...register("Price", {
              required: true,
            })}
          />
          {errors.Price?.type === "required" && (
            <p className="error-message">Price is needed</p>
          )}
          <br /><br />
          <input
            type="file"
            required
            accept="image/*" // Allow only image file selection
            onChange={handleImageChange} // Handle file selection event
          />
          {errors.Img?.type === "required" && (
            <p className="error-message">Img is needed</p>
          )}
          <br />
          <br />
          <button type="submit" onClick={onSubmitClick}>
            Add Vacation
          </button>
          <button type="button" onClick={() => navigate("/AdminPage")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVacation;
