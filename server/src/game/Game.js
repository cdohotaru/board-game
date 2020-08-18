const knownColors = ["red", "blue", "green"];

export default class Game {
    constructor() {
        this.matrix = [];
        this.size = 0;
        this.steps = [];
    }

    getRandomColor() {
        return knownColors[Math.floor(Math.random() * knownColors.length)];
    }

    initialize(boardSize, values = null) {
        this.size = boardSize;
        for (let x = 0; x < boardSize; x++) {
            this.matrix[x] = new Array(boardSize);
            for (let y = 0; y < boardSize; y++) {

                let item = {
                    x: x,
                    y: y,
                    color: values === null ? this.getRandomColor() : values[x][y].color
                };
                this.matrix[x][y] = item;
            }
        }

        // console.log(this.matrix);
    }

    print() {
        console.log(this.matrix);
        // for (let i = 0; i < this.size; i++) {
        //     for (let j = 0; j < this.size; j++) {
        //         console.log(this.matrix[i][j]);
        //     }
        // }
    }

    getNeighbors(x, y, size) {
        let neighbors = [];
        let tempX = x;
        let tempY = y;

        tempX = x - 1;
        if (tempX >= 0) {
            neighbors.push(this.matrix[tempX][y]);
        }
        tempX = x + 1;
        if (tempX < size) {
            neighbors.push(this.matrix[tempX][y]);
        }
        tempY = y - 1;
        if (tempY >= 0) {
            neighbors.push(this.matrix[x][tempY]);
        }
        tempY = y + 1;
        if (tempY < size) {
            neighbors.push(this.matrix[x][tempY]);
        }

        return neighbors;
    }

    // for testing purposes
    getMatrix() {
        return this.matrix;
    }

    calculateForColor(color, startPositionX, startPositionY, positions, matrix, originColor) {
        matrix[startPositionX][startPositionY].visited = true;

        let neighbors = this.getNeighbors(startPositionX, startPositionY, matrix.length);
        neighbors.forEach(neighbor => {
            let item = matrix[neighbor.x][neighbor.y];
            if (!item.visited) {
                item.visited = true;

                if (item.color === color) {
                    positions.push(item);
                    this.calculateForColor(color, neighbor.x, neighbor.y, positions, matrix, originColor);
                }
            }
        });
    }

    resetVisitedFlag(matrix) {
        for (let x = 0; x < matrix.length; x++) {
            for (let y = 0; y < matrix.length; y++) {
                this.matrix[x][y].visited = false;
            }
        }
    }

    // returns the variant with maximum positions that would be covered, doesn't consider color rank
    // TODO how is the color rank calculated?
    selectOptimalMove(variants) {
        console.log("variants: ", variants);
        let index = -1;
        let maxElements = -1;
        for (let i = 0; i < variants.length; i++) {
            const variant = variants[i];
            if (variant.positions.length > maxElements) {
                index = i;
                maxElements = variant.positions.length;
            }
        }

        if (index === -1) {
            console.log("Result is -1");
        }
        return variants[index];
    }

    colorTiles(positions, color, matrix) {
        for (let index = 0; index < positions.length; index++) {
            const position = positions[index];
            matrix[position.x][position.y].color = color;
        }
    }

    isBoardFilled(matrix) {
        let colors = new Set();
        for (let x = matrix.length - 1; x >= 0; x--) {
            for (let y = matrix.length - 1; y >= 0; y--) {
                colors.add(matrix[x][y].color);
                if (colors.size > 1) {
                    return false;
                }
            }
        }
        return true;
    }

    addStep(variant) {
        this.steps.push(variant);
    }

    getPossibleMoves() {
        let allVariants = [];

        knownColors.forEach(color => {

            // get neigbors of the origin with the origin color
            //      for each of them
            //          get their neighbors with the new color
            let setOfPositions = new Set();
            let collector = [];

            let originColor = this.matrix[0][0].color;

            // get neighbors of the origin with the origin color
            this.calculateForColor(originColor, 0, 0, collector, this.matrix);
            console.log("color and matrix: ", color, this.matrix, originColor, collector);

            // for each run we need to add the origin
            collector.push(this.matrix[0][0]);

            collector.forEach(element => {
                setOfPositions.add(element);
            });

            this.resetVisitedFlag(this.matrix);

            let collectorNeighborsOfNeighbors = []

            // for each of the origin neighbors get the neightbors with the desired color
            for (let index = 0; index < collector.length; index++) {
                const originNeighbor = collector[index];
                this.calculateForColor(color, originNeighbor.x, originNeighbor.y, collectorNeighborsOfNeighbors, this.matrix);
            }

            collectorNeighborsOfNeighbors.forEach(element => {
                setOfPositions.add(element)
            });

            let variant = {
                color,
                positions: Array.from(setOfPositions)
            }

            allVariants.push(variant);
            this.resetVisitedFlag(this.matrix);
            console.log("allV: ", allVariants);
        });

        return allVariants;
    }

    calculateAndMove() {
        let isBoardFilled = false;

        let counter = 0;
        do {

            let allVariants = this.getPossibleMoves();

            let variant = this.selectOptimalMove(allVariants);

            this.addStep(variant);

            console.log("selectedVariant: ", variant);

            this.colorTiles(variant.positions, variant.color, this.matrix);

            console.log("m after coloring: ", this.matrix);

            isBoardFilled = this.isBoardFilled(this.matrix);

            console.log("is board filled:", isBoardFilled);

            counter++;

        } while (isBoardFilled === false);

        return this.steps;
    }
}