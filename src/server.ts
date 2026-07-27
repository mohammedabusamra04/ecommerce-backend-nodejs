import app from "./app.js";
import sequelize from "./config/database.js";

const bootstrap = async (): Promise<void> => {
    try {
        await sequelize.authenticate();

        console.log("Database connected successfully");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.error("Unable to start the application:", error);
        process.exit(1);
    }
};

bootstrap();