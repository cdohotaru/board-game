import { cleanEnv, port, str } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
    });
}

export default validateEnv;
