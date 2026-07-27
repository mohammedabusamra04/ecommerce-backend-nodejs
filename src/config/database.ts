import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({
    path: "src/config/.env"
});

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error("Database environment variables are missing");
}

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: "postgres",
        logging: false
    }
);

export default sequelize;