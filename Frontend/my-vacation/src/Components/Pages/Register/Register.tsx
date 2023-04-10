import { Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import User from "../../model/Roles/User";
import { useState } from "react";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const send = () => {
    console.log();
  };

  const onSubmit = (data: User) => {
    console.log(data);
    navigate("/Vacations");
  };
  
  const onLoginClick = () => {
    if (Object.keys(errors).length > 0) {
      // if there are errors dont login
      console.log(errors);
    } else {
      // no errors you can login
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="Register">
      <div className="box">
        <h2>Please Register</h2>
        <form onSubmit={handleSubmit(send)}>
          <TextField
            required
            label="First Name"
            {...register("GetUserFirstName", {
              required: true,
            })}
          />
          {errors.GetUserFirstName?.type === "required" && (
            <p className="error-message">Name is needed</p>
          )}
          <br />
          <br />
          <TextField
            required
            label="Last Name"
            {...register("GetUserLastName", {
              required: true,
            })}
          />
          {errors.GetUserLastName?.type === "required" && (
            <p className="error-message">Name is needed</p>
          )}
          <br />
          <br />
          <TextField
            required
            label="Email"
            {...register("GetUserEmail", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.GetUserEmail?.type === "required" && (
            <p className="error-message">Email is needed</p>
          )}
          {errors.GetUserEmail?.type === "pattern" && (
            <p className="error-message">Email is invaild</p>
          )}
          <br />
          <br />
          <TextField
            required
            label="Password"
            type="password"
            {...register("GetUserPassword", { required: true, minLength: 4 })}
          />
          {errors.GetUserPassword && (
            <p className="error-message">Password is needed</p>
          )}
          {errors.GetUserPassword?.type === "minLength" && (
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
            <Button color="primary" type="submit" onClick={onLoginClick}>
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
