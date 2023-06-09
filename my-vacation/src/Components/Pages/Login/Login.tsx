import { useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import "./Login.css";
import User from "../../model/Roles/User";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoggedInAction, downloadUsersAction } from "../../redux/userReducer";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    //submit the form to log in to the system
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        data
      );
      const result = response.data;
      dispatch(isLoggedInAction(true)); //dispatch the redux to adress the loged in user
      dispatch(downloadUsersAction([result.user])); //download the user data
      navigate("/Vacations");
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        //checks if the user details are correct
        setErrorMessage("Email or password is incorrect");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const onLoginClick = () => {
    //check if there are errors
    if (Object.keys(errors).length > 0) {
      // If there are errors dont login
      console.log(errors);
    } else {
      // Reset the error message
      setErrorMessage("");
      // No errors you can login
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="Login">
      <div className="box">
        <h2>Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            label="Email"
            {...register("UserEmail", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })} //checks the email pattern
          />
          {errors.UserEmail?.type === "required" && (
            <p className="error-message">Email is required.</p>
          )}
          {errors.UserEmail?.type === "pattern" && (
            <p className="error-message">Invalid email format</p>
          )}
          <br />
          <br />
          <TextField
            required
            label="Password"
            type="password"
            {...register("UserPassword", { required: true, minLength: 4 })} //check password length minimum is 4
          />
          {errors.UserPassword && (
            <p className="error-message">Password is required</p>
          )}
          {errors.UserPassword?.type === "minLength" && (
            <p className="error-message">
              Password must be at least 4 characters long
            </p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <br />
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button color="primary" onClick={onLoginClick}>
              Login
            </Button>
            <Button color="secondary" onClick={() => navigate("/Register")}>
              Register
            </Button>
          </ButtonGroup>
          <br />
          <label id="LoginLabel">Don't have an account?</label>
        </form>
      </div>
    </div>
  );
}

export default Login;
