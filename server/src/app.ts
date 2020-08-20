import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";

import Routes from "./interfaces/Routes";
import NotFoundException from "./exceptions/NotFoundException";
import Logger from "./middlewares/logger";
import Config from "./config";

class App {
    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = Config.port;
        this.env = Config.node_env;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            Logger.info(`🚀 App listening on the port ${this.port}`);
        });
    }

    public getServer(): express.Application {
        return this.app;
    }

    private initializeMiddlewares() {
        if (this.env === "production") {
            this.app.use(hpp());
            this.app.use(helmet());
        }

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((req, res, next) => {
            Logger.info(`Express: Incoming request: ${req.path}. End.`);
            next();
        });
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use((req, res, next) => {
            const url = req.protocol + "://" + req.get("host") + req.originalUrl;
            Logger.error("Not found: %o", url);
            next(new NotFoundException(url));
        });

        this.app.use(
            (
                err: { status: number; message: string },
                req: any,
                res: {
                    status: (arg0: number) => void;
                    json: (arg0: { errors: { message: string } }) => void;
                },
                next: any,
            ) => {
                Logger.error(err);
                res.status(err.status || 500);
                res.json({
                    errors: {
                        message: err.message ? err.message : "Something went wrong",
                    },
                });
            },
        );
    }
}

export default App;
