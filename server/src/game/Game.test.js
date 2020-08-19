import chai from "chai";

import Game from "./Game";

import * as testData from "./testData";

const expect = chai.expect;

describe("Checks the neighbors are correctly returned", function () {
    it("for origin", function () {
        let expectedResult = [{ "color": "red", "x": 1, "y": 0 }, { "color": "red", "x": 0, "y": 1 }];
        let size = testData.testValues.length;
        let matrixData = testData.testValues;
        let noOfColors = 3;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        let result = game.getNeighbors(0, 0, size);

        expect(result).to.deep.equal(expectedResult);
    });

    it("for given data 1", function () {
        let expectedResult = [{ "color": "red", "x": 0, "y": 1 }, { "color": "blue", "x": 2, "y": 1 }, { "color": "red", "x": 1, "y": 0 }, { "color": "red", "x": 1, "y": 2 }];
        let size = testData.testValues.length;
        let matrixData = testData.testValues;
        let noOfColors = 3;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        let result = game.getNeighbors(1, 1, size);

        expect(result).to.deep.equal(expectedResult);
    });

    it("for given data 2", function () {
        let expectedResult = [{ "color": "red", "x": 1, "y": 3 }, { "color": "red", "x": 3, "y": 3 }, { "color": "blue", "x": 2, "y": 2 }];
        let size = testData.testValues.length;
        let matrixData = testData.testValues;
        let noOfColors = 3;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        let result = game.getNeighbors(2, 3, size);

        expect(result).to.deep.equal(expectedResult);
    });

    it("for given data 3", function () {
        let expectedResult = [{ "color": "green", "x": 2, "y": 3 }, { "color": "red", "x": 3, "y": 2 }];
        let size = testData.testValues.length;
        let matrixData = testData.testValues;
        let noOfColors = 3;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        let result = game.getNeighbors(3, 3, size);

        expect(result).to.deep.equal(expectedResult);
    });
});

describe("Returns tiles that will be updated by the given color", function () {
    it("for green color and test values 1", function () {
        let greenExpectedResult = [];
        let color = "green";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];
        let noOfColors = 3;

        let size = testData.testValues.length;
        let matrixData = testData.testValues;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        const matrix = game.getMatrix();

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

        expect(positions).to.deep.equal(greenExpectedResult);
    });

    it("for red colonr and test values 1", function () {
        let redExpectedResult = [
            {
                "color": "red",
                "visited": true,
                "x": 1,
                "y": 0,
            },
            {
                "color": "red",
                "visited": true,
                "x": 0,
                "y": 1,
            },
        ];
        let color = "red";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];
        let noOfColors = 3;

        let size = testData.testValues.length;
        let matrixData = testData.testValues;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        const matrix = game.getMatrix();

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

        expect(positions).to.deep.equal(redExpectedResult);
    });

    it("for blue color and test values 1", function () {
        let blueExpectedResult = [];
        let color = "blue";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];
        let noOfColors = 3;

        let size = testData.testValues.length;
        let matrixData = testData.testValues;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        const matrix = game.getMatrix();

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

        expect(positions).to.deep.equal(blueExpectedResult);
    });

    it("for green color and test values 2", function () {
        let greenExpectedResult = [];
        let color = "green";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];
        let noOfColors = 3;

        let size = testData.testValues2.length;
        let matrixData = testData.testValues2;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        const matrix = game.getMatrix();

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

        expect(positions).to.deep.equal(greenExpectedResult);
    });

    it("for red color and test values 2", function () {
        let redExpectedResult = [
            {
                "color": "red",
                "visited": true,
                "x": 1,
                "y": 0,
            },
            {
                "color": "red",
                "visited": true,
                "x": 0,
                "y": 1,
            },
        ];
        let color = "red";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];
        let noOfColors = 3;

        let size = testData.testValues2.length;
        let matrixData = testData.testValues2;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        const matrix = game.getMatrix();

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix);

        expect(positions).to.deep.equal(redExpectedResult);
    });

    it("for blue color and test values 2", function () {
        let blueExpectedResult = [];
        let color = "blue";
        let startPositionX = 0;
        let startPositionY = 0;
        let positions = [];
        let noOfColors = 3;

        let size = testData.testValues2.length;
        let matrixData = testData.testValues2;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        const matrix = game.getMatrix();
        let originColor = matrix[0][0].color;

        game.calculateForColor(color, startPositionX, startPositionY, positions, matrix, originColor);

        expect(positions).to.deep.equal(blueExpectedResult);
    });
});

describe("Runs complete game", function () {
    it("for test values 1", function () {
        let expectedSteps = [{ "color": "red", "positions": [{ "color": "green", "visited": false, "x": 0, "y": 0 }, { "color": "green", "visited": false, "x": 1, "y": 0 }, { "color": "green", "visited": false, "x": 0, "y": 1 }] }, { "color": "blue", "positions": [{ "color": "green", "visited": false, "x": 1, "y": 0 }, { "color": "green", "visited": false, "x": 0, "y": 1 }, { "color": "green", "visited": false, "x": 0, "y": 0 }, { "color": "green", "visited": false, "x": 1, "y": 1 }, { "color": "green", "visited": false, "x": 2, "y": 1 }, { "color": "green", "visited": false, "x": 3, "y": 1 }, { "color": "green", "visited": false, "x": 2, "y": 2 }, { "color": "green", "visited": false, "x": 0, "y": 2 }] }, { "color": "red", "positions": [{ "color": "green", "visited": false, "x": 1, "y": 0 }, { "color": "green", "visited": false, "x": 1, "y": 1 }, { "color": "green", "visited": false, "x": 0, "y": 1 }, { "color": "green", "visited": false, "x": 0, "y": 2 }, { "color": "green", "visited": false, "x": 2, "y": 1 }, { "color": "green", "visited": false, "x": 3, "y": 1 }, { "color": "green", "visited": false, "x": 2, "y": 2 }, { "color": "green", "visited": false, "x": 0, "y": 0 }, { "color": "green", "visited": false, "x": 1, "y": 2 }, { "color": "green", "visited": false, "x": 1, "y": 3 }, { "color": "green", "visited": false, "x": 0, "y": 3 }, { "color": "green", "visited": false, "x": 3, "y": 0 }, { "color": "green", "visited": false, "x": 3, "y": 2 }, { "color": "green", "visited": false, "x": 3, "y": 3 }] }, { "color": "green", "positions": [{ "color": "green", "visited": false, "x": 1, "y": 0 }, { "color": "green", "visited": false, "x": 1, "y": 1 }, { "color": "green", "visited": false, "x": 0, "y": 1 }, { "color": "green", "visited": false, "x": 0, "y": 2 }, { "color": "green", "visited": false, "x": 1, "y": 2 }, { "color": "green", "visited": false, "x": 2, "y": 2 }, { "color": "green", "visited": false, "x": 3, "y": 2 }, { "color": "green", "visited": false, "x": 3, "y": 1 }, { "color": "green", "visited": false, "x": 2, "y": 1 }, { "color": "green", "visited": false, "x": 3, "y": 0 }, { "color": "green", "visited": false, "x": 3, "y": 3 }, { "color": "green", "visited": false, "x": 1, "y": 3 }, { "color": "green", "visited": false, "x": 0, "y": 3 }, { "color": "green", "visited": false, "x": 0, "y": 0 }, { "color": "green", "visited": false, "x": 2, "y": 0 }, { "color": "green", "visited": false, "x": 2, "y": 3 }] }];

        let size = testData.testValues.length;
        let matrixData = testData.testValues;
        let noOfColors = 3;

        let game = new Game();
        game.initialize(size, noOfColors, matrixData);

        let stepsHistory = game.calculateAndMove();

        expect(stepsHistory).to.deep.equal(expectedSteps);
    });
});

describe("Checks all tiles of the board have the same color", function () {
    it("for test values 1", function () {
        let matrixData = testData.matrixWithAllTilesButOneInRed;

        let game = new Game();

        let result = game.isBoardFilled(matrixData);

        expect(result).to.deep.equal(false);
    });

    it("for test values 2", function () {
        let matrixData = testData.matrixWithAllTilesButOriginRed;

        let game = new Game();

        let result = game.isBoardFilled(matrixData);

        expect(result).to.deep.equal(false);
    });

    it("for test values 3", function () {
        let matrixData = testData.matrixWithAllTilesRed;

        let game = new Game();

        let result = game.isBoardFilled(matrixData);

        expect(result).to.deep.equal(true);
    });
});
