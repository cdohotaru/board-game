import Game from "./Game";

export function playGame(
    boardSize: number,
    noOfColors: number,
): { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] }[] {
    const game = new Game();

    game.initialize(boardSize, noOfColors);

    game.print();

    return game.calculateAndMove();
}
