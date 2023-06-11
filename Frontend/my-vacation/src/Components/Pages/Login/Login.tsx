import { useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import "./Login.css";
import User from "../../model/Roles/User";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    console.log(data);
  
    try {
      const response = await axios.post("http://localhost:4000/api/v1/users/login", data);
      const result = response.data;
  
      console.log("Response:", result); // Log the response
  
      if (result.success) {
        // User exists, navigate to the desired page
        navigate("/Vacations");
      } else {
        // User does not exist, display the error message
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error cases if necessary
    }
  };
  
  
  
  const onLoginClick = () => {
    if (Object.keys(errors).length > 0) {
      // If there are errors, don't login
      console.log(errors);
    } else {
      // Reset the error message
      setErrorMessage("");
      // No errors, you can attempt to login
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
            })}
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
            {...register("UserPassword", { required: true, minLength: 4 })}
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
