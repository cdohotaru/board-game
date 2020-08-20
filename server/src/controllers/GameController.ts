import { Request, Response } from "express";

import * as gameService from "../services/GameService";

class GameController {
    public play = (_req: Request, res: Response) => {
        try {
            const boardSize = _req.body.boardSize;
            const noOfColors = _req.body.noOfColors;

            if (boardSize < 13 && boardSize > 2 && noOfColors < 6 && noOfColors > 1) {
                const result = gameService.playGame(boardSize, noOfColors);
                console.log("result:", result);

                return res.json(result).status(200);
            } else {
                return res
                    .status(400)
                    .json(
                        "Board size (boardSize) must be > 2 and < 13 and number of colors (noOfColors) must be > 1 and < 6",
                    );
            }
        } catch (error) {
            return res.json(error).status(500);
        }
    };
}

export default GameController;
