const knownColors = ["red", "blue", "green"];

export default class Game {
    constructor() {
        this.matrix = [];
        this.size = 0;
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

        console.log(this.matrix);
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

    calculateForColor(color, startPositionX, startPositionY, positions, matrix) {
        // get neighbors 
        // for each neighbor
        //      mark him as visited
        //      check it has the same color as the given one
        //          if it has the same color increment a counter and save the coordinates for later use

        matrix[startPositionX][startPositionY].visited = true;

        let neighbors = this.getNeighbors(startPositionX, startPositionY, matrix.length);
        neighbors.forEach(neighbor => {
            let item = matrix[neighbor.x][neighbor.y];
            if (!item.visited) {
                item.visited = true;
                if (item.color === color) {
                    positions.push(item);
                    this.calculateForColor(color, neighbor.x, neighbor.y, positions, matrix);
                }
            }
        });

        return positions;
    }

    resetVisitedFlag(matrix) {
        for (let x = 0; x < matrix.length; x++) {
            for (let y = 0; y < matrix.length; y++) {
                this.matrix[x][y].visited = false;
            }
        }
    }

    calculateAndMove() {
        let allVariants = [];

        knownColors.forEach(color => {

            let positionsForColor = [];
            positionsForColor = this.calculateForColor(color, 0, 0, positionsForColor, this.matrix);

            let variant = {
                color,
                positions: positionsForColor
            }
            allVariants.push(variant);
            this.resetVisitedFlag(this.matrix);
        });

        // console.log(allVariants);

        allVariants.forEach(variant => {
            console.log(variant.color);
            variant.positions.forEach(position => {
                console.log(position);
            });
        });
    }
}