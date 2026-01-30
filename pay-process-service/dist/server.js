import "dotenv/config";
import app from "@/app.js";
import { sequelize } from "@/infrastructure/database/db.js";
import { createDatabaseIfNotExist } from "./infrastructure/database/createDb.js";
//db models
import { User } from "./domain/models/user.model.js";
import { Account } from "./domain/models/account.model.js";
import { History } from "./domain/models/history.model.js";
const serverPort = process.env.PUBLIC_SERVER_PORT;
const main = async () => {
    try {
        await createDatabaseIfNotExist();
        await sequelize.sync({ force: false });
        await sequelize.authenticate();
        app.listen(serverPort, () => {
            console.log(`Server is running on port: ${serverPort}`);
        });
    }
    catch (error) {
        console.error("Internal server error: ", error);
    }
};
main();
