import express, { NextFunction, Request, Response } from "express";
import MySqlLogic from "../Logic/MySqlLogic";

const loginRouter = express.Router();

loginRouter.post(
  "/login/:UserCode",
  async (request: Request, response: Response, next: NextFunction) => {
    const UserCode = +request.params.UserCode;
    response.status(202).json(await MySqlLogic.getUser(UserCode));
    console.log(response);
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

export default loginRouter;