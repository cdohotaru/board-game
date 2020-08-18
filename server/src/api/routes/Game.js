import { Router } from 'express';

import * as gameCommands from "../../game/index";

const route = Router();

export default (app) => {

    route.get('/play', async (req, res) => {
        try {
            let result = gameCommands.initAndPrint();
            return res.json(result).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    app.use('/', route);
};