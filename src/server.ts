import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const bootstrap = async (): Promise<void> => {
    try {
        await connectDatabase();

        app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("Unable to start the application:", error);
        process.exit(1);
    }
};

bootstrap();