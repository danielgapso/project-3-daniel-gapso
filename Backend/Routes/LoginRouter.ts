import express, { NextFunction, Request, Response } from "express";
import MySqlLogic from "../Logic/MySqlLogic";

const loginRouter = express.Router();

loginRouter.post("/login", async (request: Request, response: Response, next: NextFunction) => {
  const { UserEmail, UserPassword } = request.body;

  // Perform the logic to check if the user exists in the MySQL database
  const user = await MySqlLogic.getUserByEmail(UserEmail);
  if (user && user.UserPassword === UserPassword) {
    const isAdmin = user.isAdmin === 1; 
    response.status(200).json({ success: true, message: "Login successful", isAdmin });
  } else {
    response.status(401).json({ success: false, message: "Invalid email or password" });
  }
});




loginRouter.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    const NewUser = request.body;
    const result = await MySqlLogic.AddUser(NewUser);
    response.status(201).json(result);
  }
);

export default loginRouter;