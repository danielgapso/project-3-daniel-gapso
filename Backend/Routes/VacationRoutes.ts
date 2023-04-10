import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
    "/AddVacation",
   

router.delete(
    "/DeleteVacation/:id",    

router.get(
    "/NewVacation/:VacationName",    

router.get(
    "/all",


router.put(
   "/update",    

export default router