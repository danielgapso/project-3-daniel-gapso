import { Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import User from "../../model/Roles/User";
import { useState } from "react";
import axios from "axios";

function Register(): JSX.Element {
  const [UserFirstName, setUserFirstName] = useState("");
  const [UserLastName, setUserLastName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userForm>();

  type userForm = {
    UserFirstName: string;
    UserLastName: string;
    UserEmail: string;
    UserPassword: string;
  };

  const onSubmit = (data: userForm) => {
    addNewUser(data);
  };

  const addNewUser = (data: userForm) => {
    const formData = new FormData();
    formData.append("UserFirstName", data.UserFirstName);
    formData.append("UserLastName", data.UserLastName);
    formData.append("UserEmail", data.UserEmail);
    formData.append("UserPassword", data.UserPassword);
    formData.append("isAdmin", "0");
    axios
      .post("http://localhost:4000/api/v1/users/register", formData)
      .then((res) => {
        if (res.data === "Email already exists in the database") {
          setServerError("Email already exists");
        } else {
          navigate("/Vacations");
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setServerError(error.message);
      });
  };

  return (
    <div className="Register">
      <div className="box">
        <h2>Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            label="First Name"
            {...register("UserFirstName", {
              required: true,
            })}
          />
          {errors.UserFirstName?.type === "required" && (
            <p className="error-message">First name is needed</p>
          )}
          <br />
          <br />
          <TextField
            required
            label="Last Name"
            {...register("UserLastName", {
              required: true,
            })}
          />
          {errors.UserLastName?.type === "required" && (
            <p className="error-message">Last name is needed</p>
          )}
          <br />
          <br />
          <TextField
            required
            label="Email"
            {...register("UserEmail", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.UserEmail?.type === "required" && (
            <p className="error-message">Email is needed</p>
          )}
          {errors.UserEmail?.type === "pattern" && (
            <p className="error-message">Email is invaild</p>
          )}
          {serverError && <p className="error-message">{serverError}</p>}
          <br />
          <br />
          <TextField
            required
            label="Password"
            type="password"
            {...register("UserPassword", { required: true, minLength: 4 })}
          />
          {errors.UserPassword && (
            <p className="error-message">Password is needed</p>
          )}
          {errors.UserPassword?.type === "minLength" && (
            <p className="error-message">
              Password must be at least 4 characters long
            </p>
          )}
          <br />
          <br />
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button color="primary" type="submit">
              Register
            </Button>
            <Button color="secondary" onClick={() => navigate("/Login")}>
              login
            </Button>
          </ButtonGroup>
          <br />
          <label id="LoginLabel">already have an account ?</label>
        </form>
      </div>
    </div>
  );
}

export default Register;
