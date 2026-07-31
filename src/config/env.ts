import dotenv from "dotenv";

dotenv.config();

export const env = {
    MONGODB_URI: process.env.MONGODB_URI as string,

    PORT: Number(process.env.PORT ?? 3000),

    NODE_ENV: process.env.NODE_ENV ?? "development",

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,

    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES ?? "15m",

    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES ?? "30d"
};
