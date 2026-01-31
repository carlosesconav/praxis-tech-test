import { Sequelize } from "sequelize";
import "dotenv/config";


const dbName: string = `${process.env.DB_NAME}`;
const dbUser: string = `${process.env.DB_USER}`;
const dbHost: string = `${process.env.DB_HOST}`;

export const sequelize = new Sequelize(dbName, dbUser, "", {
  host: dbHost,
  dialect: "mysql",
});