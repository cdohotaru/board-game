import dotenv from "dotenv";

const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    client_port: 3001,
    node_env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    logs: {
        level: process.env.LOG_LEVEL || "silly",
    },
    api: {
        prefix: "/",
    },
};
