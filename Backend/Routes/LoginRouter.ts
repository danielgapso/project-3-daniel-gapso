import express, { NextFunction, Request, Response } from "express";
import MySqlLogic from "../Logic/MySqlLogic";

const loginRouter = express.Router();

loginRouter.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("login user");
    response.status(200).json(`{"msg":"all is good"}`);
  }
);

loginRouter.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    const NewUser = request.body;
    const result = await MySqlLogic.AddUser(NewUser);
    response.status(201).json(result);
  }
);

loginRouter.delete(
  "/deleteUser/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("delete user");
    response.status(201).json(`{"msg":"user deleted"}`);
  }
);

loginRouter.put(
  "/updateUser/",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("update user");
    response.status(202).json(`{"msg":"user updated"}`);
  }
);
export default loginRouter;