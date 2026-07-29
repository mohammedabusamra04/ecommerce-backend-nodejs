import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_URI);

export const env = {
    MONGODB_URI: process.env.MONGODB_URI as string,
    PORT: Number(process.env.PORT ?? 3000),
    NODE_ENV: process.env.NODE_ENV ?? "development"
};