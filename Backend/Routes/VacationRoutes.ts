import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import MySqlLogic from "../Logic/MySqlLogic";
import fileUpload from "express-fileupload";
import dal_mysql from "../Utils/dal_mysql";

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
  "/GetAllVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(202).json(await MySqlLogic.GetAllVacations());
  }
);

VacationsRouter.delete(
  "/delete/:VacationCode",
  async (request: Request, response: Response, next: NextFunction) => {
    const VacationCode = +request.params.VacationCode;
    MySqlLogic.DeleteVacation(VacationCode);
    response.status(204).json();
  }
);

VacationsRouter.put(
  "/UpdateVacation",
  async (request: Request, response: Response, next: NextFunction) => {
   response.status(202).json(await MySqlLogic.UpdateVacation(request.body));
  }
);

export default VacationsRouter;