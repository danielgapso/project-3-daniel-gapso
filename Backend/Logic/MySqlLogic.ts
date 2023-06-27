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
        UserEmail VARCHAR(255) NOT NULL,
        isAdmin TINYINT NOT NULL DEFAULT 0,
        likedVacations JSON NULL,
        PRIMARY KEY (UserCode)
    );
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
        likes INT NOT NULL DEFAULT 0,
        PRIMARY KEY (VacationCode));
        `;
  const response = dal_mysql.execute(SQLcommand);
};

const CreateFollowersTable = () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS vacations.followers (
        UserCode INT NOT NULL,
        VacationCode INT NOT NULL,
        FOREIGN KEY (UserCode) REFERENCES users(UserCode),
        FOREIGN KEY (VacationCode) REFERENCES vacations(VacationCode)
    );
    `;
  const response = dal_mysql.execute(SQLcommand);
};

const getUser = async (UserEmail: string, UserPassword: string) => {
  const user = await getUserByEmail(UserEmail);
  if (!user) {
    console.log("invalid")
  }
  try {
    const userPass = UserPassword == user.UserPassword;
    if (!UserPassword) {
      console.log("invalid pass")
    }
    return user;
  }
  catch {
    console.error();
  }
};

const AddUser = async (NewUser: User) => {
  const { UserFirstName, UserLastName, UserPassword, UserEmail } = NewUser;
  // Check if the email already exists
  const existingUser = await getUserByEmail(UserEmail);
  if (existingUser) {
    // Return an error message instead of throwing an error
    return "Email already exists in the database";
  }
  const SQLcommand = `
      INSERT INTO vacations.users 
      (UserFirstName, UserLastName, UserPassword, UserEmail,likedVacations) 
      VALUES ('${UserFirstName}', '${UserLastName}', '${UserPassword}', '${UserEmail}' ,'[ ]');

    `;
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

const getUserByEmail = async (email: string) => {
  const SQLcommand = `SELECT * FROM vacations.users WHERE UserEmail = '${email}';`;
  console.log("sql>", SQLcommand);
  const result = await dal_mysql.execute(SQLcommand);
  console.log("result", result);
  return result.length > 0 ? result[0] : null;
};

//likes

const toggleLike = async (UserCode: number, VacationCode: number) => {
  const userSql = `
      SELECT likedVacations
      FROM users
      WHERE UserCode = ${UserCode}
    `;
  console.log("User SQL:", userSql);
  const userResult: { likedVacations: string }[] = await dal_mysql.execute(
    userSql,
    [UserCode]
  );
  console.log("userResult", userResult);

  const currentLikedVacations: number[] = userResult[0].likedVacations === 'null'
    ? []
    : JSON.parse(userResult[0].likedVacations);

  console.log("currentLikedVacations", currentLikedVacations);

  if (currentLikedVacations.includes(VacationCode)) {
    // Remove the like
    console.log("Removing like from vacationId:", VacationCode);
    const index = currentLikedVacations.indexOf(VacationCode);
    currentLikedVacations.splice(index, 1);

    const removeLikeSql = `
        DELETE FROM followers
        WHERE VacationCode = ${VacationCode} AND UserCode = ${UserCode}
      `;
    console.log("Remove Like SQL:", removeLikeSql);
    await dal_mysql.execute(removeLikeSql, [VacationCode, UserCode]);
    //?
    const updateVacationSql = `
        UPDATE vacations
        SET likes = likes - 1
        WHERE VacationCode = ${VacationCode}
      `;
    await dal_mysql.execute(updateVacationSql, [VacationCode]);
  } else {
    // Add the like
    console.log("Adding like to vacationId:", VacationCode);

    currentLikedVacations.push(VacationCode);

    const addLikeSql = `
        INSERT INTO followers (VacationCode, UserCode)
        VALUES (${VacationCode}, ${UserCode})
      `;
    console.log("Add Like SQL:", addLikeSql);
    await dal_mysql.execute(addLikeSql, [VacationCode, UserCode]);

    const updateVacationSql = `
        UPDATE vacations
        SET likes = likes + 1
        WHERE VacationCode = ${VacationCode}
      `;
    await dal_mysql.execute(updateVacationSql, [VacationCode]);
  }

  const updateLikedVacationsSql = `
    UPDATE users
    SET likedVacations = '${JSON.stringify(currentLikedVacations)}'
    WHERE UserCode = ${UserCode}
    `;
  await dal_mysql.execute(updateLikedVacationsSql, [
    JSON.stringify(currentLikedVacations),
    UserCode,
  ]);
};
//stopped here 
const getLikesByUser = async (UserCode: number) => {
  const sql = `
    SELECT vacations.VacationCode
    FROM vacations.followers
    INNER JOIN vacations.vacations ON followers.VacationCode = vacations.VacationCode
    WHERE followers.UserCode = ${UserCode}  
    `;

  console.log("SQL Query:", sql); // Log the SQL query

  const result: Vacation[] = await dal_mysql.execute(sql, [UserCode]);
  return result;
};


const getLikesPerVacation = async () => {
  const sql = `
        SELECT destination, likes
        FROM vacations.vacations
      `;
  const result: any = await dal_mysql.execute(sql);
  return result;
};

//admin 
const AddVacation = async (NewVacation: Vacation) => {
  const SQLcommand = `
    INSERT INTO vacations.vacations 
    (Destination, Description, StartDate, EndDate, Price, Img , likes)
     VALUES 
    ('${NewVacation.Destination}', '${NewVacation.Description}', '${NewVacation.StartDate}', 
    '${NewVacation.EndDate}', '${NewVacation.Price}', '${NewVacation.Img}', 0);`
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

const UpdateVacation = async (vacationCode: number, Vacation: Vacation) => {
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

const getVacationByCode = async (vacationCode: number) => {
  const SQLcommand = `SELECT * FROM vacations WHERE VacationCode = ${vacationCode}`;
  console.log("sql>", SQLcommand);
  const result = await dal_mysql.execute(SQLcommand);
  console.log("result", result);
  return result.length > 0 ? result[0] : null;
};

export default {
  AddUser,
  getUser,
  GetAllVacations,
  toggleLike,
  getLikesByUser,
  getLikesPerVacation,
  AddVacation,
  UpdateVacation,
  DeleteVacation,
  CreateUsersTable,
  createVacationsTable,
  CreateFollowersTable,
  getUserByEmail,
  getVacationByCode
};