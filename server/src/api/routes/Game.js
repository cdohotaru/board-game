import { Router } from 'express';

import * as gameCommands from "../../game/index";

const route = Router();

export default (app) => {

    route.post('/play', (req, res) => {
        try {
            let boardSize = req.body.boardSize;
            let noOfColors = req.body.noOfColors;

            if (boardSize < 13 && boardSize > 2 && noOfColors < 6 && noOfColors > 1) {
                let result = gameCommands.playGame(boardSize, noOfColors);
                return res.json(result).status(200);
            } else {
                return res.status(400).json("Board size (boardSize) must be > 2 and < 13 and number of colors (noOfColors) must be > 1 and < 6");
            }
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    app.use('/', route);
};