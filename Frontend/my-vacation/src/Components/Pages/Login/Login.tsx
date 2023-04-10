import { Button, ButtonGroup, TextField } from "@mui/material";
import "./Login.css";
import User from "../../model/Roles/User";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

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
    <div className="Login">
      <div className="box">
        <h2>Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            label="Email"
            {...register("GetUserEmail", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.GetUserEmail?.type === "required" && (
            <p className="error-message">Email is required.</p>
          )}
          {errors.GetUserEmail?.type === "pattern" && (
            <p className="error-message">Invalid email format</p>
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
            <p className="error-message">Password is required</p>
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
