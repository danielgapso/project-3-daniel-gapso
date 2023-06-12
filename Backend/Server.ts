import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import bodyParser from "body-parser";
import VacationsRouter from "./Routes/VacationRoutes";
import loginRouter from "./Routes/LoginRouter";
import logic from "./Logic/MySqlLogic";
import ErrorHandler from "./MiddleWare/route-not-found";
const server = express();

server.use(cors());

server.use(express.json());

server.use(express.static("images"));

server.use(fileUpload({ createParentPath: true }));

server.use(bodyParser.json());

server.use("/api/v1/vacations", VacationsRouter);

server.use("/api/v1/users", loginRouter);

console.log("check if table exists...");
logic.CreateUsersTable();
logic.createVacationsTable();
logic.CreateFollowersTable();

server.use("*", ErrorHandler);

server.listen(config.WebPort, () => {
    console.log(`listinging on http://${config.mySQLhost}:${config.WebPort}`);
  });