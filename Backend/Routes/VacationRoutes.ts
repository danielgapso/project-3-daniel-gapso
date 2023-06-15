import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import MySqlLogic from "../Logic/MySqlLogic";
import fileUpload, { UploadedFile } from "express-fileupload";
import dal_mysql from "../Utils/dal_mysql";
import fs from "fs";
import Vacation from "../Models/Vacations/Vacation";

const VacationsRouter = express.Router();

VacationsRouter.post(
  "/AddVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = request.body;
    const imageFile = request.files?.Img as UploadedFile;
    // Generate a unique filename for the image
    const fileName = Date.now() + "-" + imageFile.name;
    // Save the image file to the server-side folder
    imageFile.mv(`images/${fileName}`, async (error) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Failed to upload image" });
      }
      // Save the image filename in the database
      newVacation.Img = fileName;
      // Perform the database operation to add the vacation
      const result = await MySqlLogic.AddVacation(newVacation);
      response.status(201).json(result);
    });
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
  "/UpdateVacation/:VacationCode",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationCode = +request.params.VacationCode;
    const updatedVacation: Vacation = request.body;
    if (request.files && request.files.Img) {
      const imgFile = request.files.Img as UploadedFile;
      const imgPath = `${imgFile.name}`;
      if (updatedVacation.Img) {
      }
      updatedVacation.Img = imgPath;
      imgFile.mv(`images/${imgPath}`, (error) => {
        if (error) {
          console.error("Error saving new image:", error);
        }
      });
    }
    await MySqlLogic.UpdateVacation(vacationCode, updatedVacation);
    response.status(202).json({ message: "Vacation updated successfully" });
  }
);

VacationsRouter.get(
  "/GetVacation/:VacationCode",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationCode = +request.params.VacationCode;
    const vacation = await MySqlLogic.getVacationByCode(vacationCode);
    if (vacation) {
      response.status(200).json(vacation);
    } else {
      response.status(404).json({ error: "Vacation not found" });
    }
  }
);


export default VacationsRouter;