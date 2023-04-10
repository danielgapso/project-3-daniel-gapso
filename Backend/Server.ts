import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import bodyParser from "body-parser";
import router from "./Routes/VacationRoutes";
import loginRouter from "./Routes/LoginRouter";

const server = express();

server.use(cors());

server.use(express.json());

server.use(express.static("Vacations"));

server.use(fileUpload({ createParentPath: true }));

server.use(bodyParser.json());

server.use("/api/v1/videos", router);

server.use("/api/v1/users", loginRouter);