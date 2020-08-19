import Game from "./Game";

export function playGame(boardSize, noOfColors) {
    let game = new Game();

    game.initialize(boardSize, noOfColors);

    game.print();

    return game.calculateAndMove();
}