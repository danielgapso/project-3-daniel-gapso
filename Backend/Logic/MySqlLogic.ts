import { OkPacket } from "mysql";
import User from "../Models/Roles/User";
import Vacation from "../Models/Vacations/Vacation";
import dal_mysql from "../Utils/dal_mysql";

//tables

const CreateUsersTable = () => {
    const SQLcommand = `
    CREATE TABLE IF NOT EXISTS vacations.users (
        UserCode INT NOT NULL AUTO_INCREMENT,
        UserFirstName VARCHAR(45) NOT NULL,
        UserLastName VARCHAR(45) NOT NULL,
        UserPassword VARCHAR(45) NOT NULL,
        UserEmail VARCHAR(45) NOT NULL,
        PRIMARY KEY (UserCode));
    `;
    const response = dal_mysql.execute(SQLcommand);
};

const createVacationsTable = () => {
    const SQLcommand = `
    CREATE TABLE IF NOT EXISTS vacations.vacations (
        VacationCode INT NOT NULL AUTO_INCREMENT,
        Destination VARCHAR(45) NOT NULL,
        Description VARCHAR(128) NOT NULL,
        StartDate VARCHAR(45) NOT NULL,
        EndDate VARCHAR(45) NOT NULL,
        Price VARCHAR(45) NOT NULL,
        Img VARCHAR(256) NOT NULL,
        PRIMARY KEY (VacationCode));
        `;
    const response = dal_mysql.execute(SQLcommand);
};

//user
const AddUser = async (NewUser: User) => {
    const SQLcommand = `
    INSERT INTO vacations.users 
    (UserFirstName, UserLastName, UserPassword, UserEmail) 
    VALUES ('${NewUser.GetUserFirstName}', 
    '${NewUser.GetUserLastName}', 
    '${NewUser.GetUserPassword}', 
    ${NewUser.GetUserEmail}
 );`
    console.log("sql>", SQLcommand);
    const response: OkPacket = await dal_mysql.execute(SQLcommand);
    const categoryId = response.insertId;
    console.log("New Id", categoryId, " Message:", response.message);
    return categoryId;
};

const GetAllVacations = async () => { }

const FollowVacation = async (Vacation: Vacation) => { }

const UnFollowVacation = async (Vacation: Vacation) => { }

//admin 
const AddVacation = async (NewVacation: Vacation) => {
    const SQLcommand = `
    INSERT INTO vacations.vacations 
    (Destination, Description, StartDate, EndDate, Price, Img)
     VALUES 
    ('${NewVacation.GetDestination}', '${NewVacation.GetDescription}', '${NewVacation.GetStartDate}', 
    '${NewVacation.GetEndDate}', '${NewVacation.GetPrice}', '${NewVacation.GetImg}');`
  const response: OkPacket = await dal_mysql.execute(SQLcommand);
  const VacationCode = response.insertId;
  console.log("New Id", VacationCode, " Message:", response.message);
  return VacationCode;
 
}

const UpdateVacation = async (Vacation: Vacation) => { }

const DeleteVacation = (id: number) => { }

export default {
    AddUser,
    GetAllVacations,
    FollowVacation,
    UnFollowVacation,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    CreateUsersTable,
    createVacationsTable
}