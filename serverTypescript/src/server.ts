import "dotenv/config";
import App from "./app";

import validateEnv from "./utils/validateEnv";
import GameRoute from "./routes/GameRoute";

try {
    validateEnv();

    const app = new App([new GameRoute()]);

    app.listen();
} catch (error) {
    console.log(error);
}
