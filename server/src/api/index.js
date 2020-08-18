import express from 'express';
import Game from './routes/Game';

export default () => {
    const app = express();
    Game(app);

    return app
}