import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import MySqlLogic from "../Logic/MySqlLogic";

const VacationsRouter = express.Router();

VacationsRouter.post(
    "/AddVacation",
    async (request: Request, response: Response, next: NextFunction) => {
        const newVacation = request.body;
        const result = await MySqlLogic.AddVacation(newVacation);
        response.status(201).json(result);
    }
);
VacationsRouter.get(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      response.status(200).json("Controller working !!!");
    }
  );

   export default VacationsRouter;