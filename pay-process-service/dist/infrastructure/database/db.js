import { Sequelize } from "sequelize";
import "dotenv/config";
const dbName = `${process.env.PUBLIC_DB_NAME}`;
const dbUser = `${process.env.PRIVATE_DB_USER}`;
const dbHost = `${process.env.PRIVATE_DB_HOST}`;
export const sequelize = new Sequelize(dbName, dbUser, "", {
    host: dbHost,
    dialect: "mysql",
});
