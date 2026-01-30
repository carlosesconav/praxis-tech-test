import mysql from "mysql2/promise";
const dbPort = `${process.env.PUBLIC_DB_NAME}`;
const dbUser = `${process.env.PRIVATE_DB_USER}`;
const dbHost = `${process.env.PRIVATE_DB_HOST}`;
const dbName = `${process.env.PUBLIC_DB_NAME}`;
export const createDatabaseIfNotExist = async () => {
    const connection = await mysql.createConnection({
        host: dbHost,
        port: Number(dbPort),
        user: dbUser,
        password: "",
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci`);
    await connection.end();
    console.log(` Database "${dbName}" created`);
};
