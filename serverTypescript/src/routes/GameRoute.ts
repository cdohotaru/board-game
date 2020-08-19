import { Router } from "express";
import GameController from "../controllers/GameController";
import Route from "../interfaces/Routes";

class GameRoute implements Route {
    public path = "/play";
    public router = Router();
    public gameController = new GameController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.gameController.play);
    }
}

export default GameRoute;
