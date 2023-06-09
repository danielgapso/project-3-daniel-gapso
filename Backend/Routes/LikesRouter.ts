import express, { NextFunction, Request, Response } from "express";
import User from "../Models/Roles/User"
import Vacation from "../Models/Vacations/Vacation";
import MySqlLogic from "../Logic/MySqlLogic";

const likeRouter = express.Router();

//add / remove like
likeRouter.post(
  "/addLike",
  async (request: Request, response: Response, next: NextFunction) => {
    const UserCode = +request.body.UserCode;
    const VacationCode = +request.body.VacationCode;
    try {
      const like = await MySqlLogic.toggleLike(UserCode, VacationCode);
      response.status(200).json({
        like: like,
        message: "Liked",
      });
    } catch (error) {
      response.status(500).json({ message: "we have an error" });
    }
  }
);

//get likes by user
likeRouter.post(
  "/getLikesByUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const UserCode = +request.body.UserCode;
    try {
      const likes = await MySqlLogic.getLikesByUser(UserCode);
      response.status(200).json({
        likes: likes,
        message: "Likes retrieved successfully",
      });
      console.log("likes:", likes);
    } catch (error) {
      response.status(500).json({ message: "Something went wrong" });
    }
  }
);

//get likes per vacation
likeRouter.get(
  "/likesPerVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await MySqlLogic.getLikesPerVacation();
      response.status(200).json({
        vacations: vacations,
        message: "Likes retrieved successfully",
      });
      console.log("vacations:", vacations);
    } catch (error) {
      response.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default likeRouter;