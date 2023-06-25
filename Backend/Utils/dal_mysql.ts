import mysql from "mysql";
import config from "./Config";

const connection = mysql.createPool({
  host: config.mySQLhost,
  user: config.mySQLuser,
  password: config.mySQLpass,
  database: config.mySQLdatabase,
  });
  
  const execute = (sql: string , params?: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}

export default {
    execute
}