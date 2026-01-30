import { Sequelize } from "sequelize";
import "dotenv/config";


const dbName: string = `${process.env.PUBLIC_DB_NAME}`;
const dbUser: string = `${process.env.PRIVATE_DB_USER}`;
const dbHost: string = `${process.env.PRIVATE_DB_HOST}`;

export const sequelize = new Sequelize(dbName, dbUser, "", {
  host: dbHost,
  dialect: "mysql",
});