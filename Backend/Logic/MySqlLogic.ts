import { OkPacket } from "mysql";
import User from "../Models/Roles/User";
import Vacation from "../Models/Vacations/Vacation";
import dal_mysql from "../Utils/dal_mysql";
import { response } from "express";

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
    const UserCode = response.insertId;
    console.log("New Id", UserCode, " Message:", response.message);
    return UserCode;
};

const GetAllVacations = async () => {
    const SQLcommand = `SELECT * FROM vacations.vacations`;
    console.log("sql>", SQLcommand);
    return await dal_mysql.execute(SQLcommand);
};

const FollowVacation = async (Vacation: Vacation) => { };

const UnFollowVacation = async (Vacation: Vacation) => { };

//admin 
const AddVacation = async (NewVacation: Vacation) => {
    const SQLcommand = `
    INSERT INTO vacations.vacations 
    (Destination, Description, StartDate, EndDate, Price, Img)
     VALUES 
    ('${NewVacation.Destination}', '${NewVacation.Description}', '${NewVacation.StartDate}', 
    '${NewVacation.EndDate}', '${NewVacation.Price}', '${NewVacation.Img}');`
    const response: OkPacket = await dal_mysql.execute(SQLcommand);
    const VacationCode = response.insertId;
    console.log("New Id", VacationCode, " Message:", response.message);
    console.log("New Vacation object: ", NewVacation);
    console.log("Destination:", NewVacation.Destination);
    console.log("Description:", NewVacation.Description);
    console.log("Start Date:", NewVacation.StartDate);
    console.log("End Date:", NewVacation.EndDate);
    console.log("Price:", NewVacation.Price);
    console.log("Image:", NewVacation.Img);
    return SQLcommand;
};

const UpdateVacation = async (Vacation: Vacation) => {
    const SQLcommands = `
    UPDATE
    vacations.vacations
     SET 
     Destination = '${Vacation.Destination}', 
     Description = '${Vacation.Description}',
     StartDate = '${Vacation.StartDate}', 
     EndDate = '${Vacation.EndDate}',
     Price = '${Vacation.Price}', 
     Img = '${Vacation.Img}' 
     WHERE
     (VacationCode = '${Vacation.VacationCode}');
     `;
    await dal_mysql.execute(SQLcommands);
    console.log(SQLcommands);
    return true;
};

const DeleteVacation = (VacationCode: number) => {
    const SQLcommand = `DELETE FROM vacations.vacations WHERE VacationCode=${VacationCode}`;
    dal_mysql.execute(SQLcommand);
    return true;
};

export default {
    AddUser,
    GetAllVacations,
    FollowVacation,
    UnFollowVacation,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    CreateUsersTable,
    createVacationsTable,
};