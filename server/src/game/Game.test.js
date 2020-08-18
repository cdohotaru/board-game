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

const testValues2 = [
    [
        { x: 0, y: 0, color: 'red' },
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

describe("Returns tiles that will be updated by the given color", function () {
    // it("for green color and test values 1", function () {
    //     let greenExpectedResult = [];
    //     let size = testValues.length;
    //     let color = "green";
    //     let startPositionX = 0;
    //     let startPositionY = 0;
    //     let positions = [];

    //     let game = new Game();
    //     game.initialize(size, testValues);
    //     const matrix = game.getMatrix();

    //     let result = game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

    //     expect(result).to.deep.equal(greenExpectedResult);
    // });

    // it("for red colonr and test values 1", function () {
    //     let redExpectedResult = [
    //         {
    //             "color": "red",
    //             "visited": true,
    //             "x": 1,
    //             "y": 0,
    //         },
    //         {
    //             "color": "red",
    //             "visited": true,
    //             "x": 0,
    //             "y": 1,
    //         },
    //     ];
    //     let size = testValues.length;
    //     let color = "red";
    //     let startPositionX = 0;
    //     let startPositionY = 0;
    //     let positions = [];

    //     let game = new Game();
    //     game.initialize(size, testValues);
    //     const matrix = game.getMatrix();

    //     let result = game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

    //     expect(result).to.deep.equal(redExpectedResult);
    // });

    // it("for blue color and test values 1", function () {
    //     let blueExpectedResult = [];
    //     let size = testValues.length;
    //     let color = "blue";
    //     let startPositionX = 0;
    //     let startPositionY = 0;
    //     let positions = [];

    //     let game = new Game();
    //     game.initialize(size, testValues);
    //     const matrix = game.getMatrix();

    //     let result = game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

    //     expect(result).to.deep.equal(blueExpectedResult);
    // });

    // it("for green color and test values 2", function () {
    //     let greenExpectedResult = [];
    //     let size = testValues2.length;
    //     let color = "green";
    //     let startPositionX = 0;
    //     let startPositionY = 0;
    //     let positions = [];

    //     let game = new Game();
    //     game.initialize(size, testValues2);
    //     const matrix = game.getMatrix();

    //     let result = game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

    //     expect(result).to.deep.equal(greenExpectedResult);
    // });

    // it("for red color and test values 2", function () {
    //     let redExpectedResult = [
    //         {
    //             "color": "red",
    //             "visited": true,
    //             "x": 1,
    //             "y": 0,
    //         },
    //         {
    //             "color": "red",
    //             "visited": true,
    //             "x": 0,
    //             "y": 1,
    //         },
    //     ];
    //     let size = testValues2.length;
    //     let color = "red";
    //     let startPositionX = 0;
    //     let startPositionY = 0;
    //     let positions = [];

    //     let game = new Game();
    //     game.initialize(size, testValues2);
    //     const matrix = game.getMatrix();

    //     let result = game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

    //     expect(result).to.deep.equal(redExpectedResult);
    // });

    it("for blue color and test values 2", function () {
        let blueExpectedResult = [];
        let size = testValues2.length;
        let color = "blue";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];

        let game = new Game();
        game.initialize(size, testValues2);
        const matrix = game.getMatrix();
        let originColor = matrix[0][0].color;

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix, originColor);

        expect(positions).to.deep.equal(blueExpectedResult);
    });
});

