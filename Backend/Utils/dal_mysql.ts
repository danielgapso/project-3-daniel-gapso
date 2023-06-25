import mysql from "mysql";
import config from "./Config";

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST || config.mySQLhost,
    user: process.env.MYSQL_USER || config.mySQLuser,
    password: process.env.MYSQL_PASSWORD || config.mySQLpass,
    database: process.env.MYSQL_DATABASE || config.mySQLdatabase,
  });
  

  const execute = (sql: string, params?: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      connection.query(sql, params, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  };
  

export default {
    execute
}
