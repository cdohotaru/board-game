import Game from "./Game";

export function getTestValues() {
    return [
        [
            { x: 0, y: 0, color: 'green' },
            { x: 0, y: 1, color: 'red' },
            { x: 0, y: 2, color: 'blue' },
            { x: 0, y: 3, color: 'red' }
        ],
        [
            { x: 1, y: 0, color: 'red' },
            { x: 1, y: 1, color: 'blue' },
            { x: 1, y: 2, color: 'red' },
            { x: 1, y: 3, color: 'red' }
        ],
        [
            { x: 2, y: 0, color: 'green' },
            { x: 2, y: 1, color: 'blue' },
            { x: 2, y: 2, color: 'blue' },
            { x: 2, y: 3, color: 'green' }
        ],
        [
            { x: 3, y: 0, color: 'red' },
            { x: 3, y: 1, color: 'blue' },
            { x: 3, y: 2, color: 'red' },
            { x: 3, y: 3, color: 'red' }
        ]
    ]
}


export function initAndPrint() {
    let size = 4;

    let game = new Game();

    let testValues = getTestValues();
    game.initialize(7);

    game.print();

    return game.calculateAndMove();
}