import chai from "chai";

import Game from "./Game";

import {
    getNeighbors
} from "./Game";

const expect = chai.expect;

const testValues = [
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
];

describe("Checks the neighbors are correctly returned", function () {
    it("for origin", function () {
        let expectedResult = [{ "color": "red", "x": 1, "y": 0 }, { "color": "red", "x": 0, "y": 1 }];
        let size = testValues.length;

        let game = new Game();
        game.initialize(size, testValues);

        let result = game.getNeighbors(0, 0, size);

        expect(result).to.deep.equal(expectedResult);
    });

    it("for given data 1", function () {
        let expectedResult = [{ "color": "red", "x": 0, "y": 1 }, { "color": "blue", "x": 2, "y": 1 }, { "color": "red", "x": 1, "y": 0 }, { "color": "red", "x": 1, "y": 2 }];
        let size = testValues.length;

        let game = new Game();
        game.initialize(size, testValues);

        let result = game.getNeighbors(1, 1, size);

        expect(result).to.deep.equal(expectedResult);
    });

    it("for given data 2", function () {
        let expectedResult = [{ "color": "red", "x": 1, "y": 3 }, { "color": "red", "x": 3, "y": 3 }, { "color": "blue", "x": 2, "y": 2 }];
        let size = testValues.length;

        let game = new Game();
        game.initialize(size, testValues);

        let result = game.getNeighbors(2, 3, size);

        expect(result).to.deep.equal(expectedResult);
    });

    it("for given data 3", function () {
        let expectedResult = [{ "color": "green", "x": 2, "y": 3 }, { "color": "red", "x": 3, "y": 2 }];
        let size = testValues.length;

        let game = new Game();
        game.initialize(size, testValues);

        let result = game.getNeighbors(3, 3, size);

        expect(result).to.deep.equal(expectedResult);
    });
});