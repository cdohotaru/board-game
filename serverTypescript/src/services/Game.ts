const knownColors = ["red", "blue", "green", "yellow", "purple"];

export default class Game {
    matrix: [{ x: number; y: number; color: string; visited?: boolean }[]] | [];
    size: number;
    steps: { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] }[];
    noOfColorsUsed: number;

    constructor() {
        this.matrix = [];
        this.size = 0;
        this.steps = [];
        this.noOfColorsUsed = knownColors.length;
    }

    getRandomColor(): string {
        return knownColors[Math.floor(Math.random() * this.noOfColorsUsed)];
    }

    initialize(boardSize: number, noOfColors: number, values?: { color: string }[][]): void {
        this.size = boardSize;
        this.noOfColorsUsed = noOfColors;

        for (let x = 0; x < boardSize; x++) {
            this.matrix[x] = new Array(boardSize);
            for (let y = 0; y < boardSize; y++) {
                const item = {
                    x: x,
                    y: y,
                    color: !values ? this.getRandomColor() : values[x][y].color,
                };
                this.matrix[x][y] = item;
            }
        }
    }

    print(): void {
        console.log(this.matrix);
    }

    getNeighbors(x: number, y: number, size: number): { x: number; y: number; color: string }[] {
        const neighbors = [];
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
    getMatrix(): [{ x: number; y: number; color: string }[]] | [] {
        return this.matrix;
    }

    calculateForColor(
        color: string,
        startPositionX: number,
        startPositionY: number,
        positions: { x: number; y: number; color: string }[],
        matrix: [{ x: number; y: number; color: string; visited?: boolean }[]] | [],
    ): void {
        matrix[startPositionX][startPositionY].visited = true;

        const neighbors = this.getNeighbors(startPositionX, startPositionY, matrix.length);
        neighbors.forEach((neighbor) => {
            const item = matrix[neighbor.x][neighbor.y];
            if (!item.visited) {
                item.visited = true;

                if (item.color === color) {
                    positions.push(item);
                    this.calculateForColor(color, neighbor.x, neighbor.y, positions, matrix);
                }
            }
        });
    }

    resetVisitedFlag(matrix: [{ x: number; y: number; color: string; visited?: boolean }[]] | []): void {
        for (let x = 0; x < matrix.length; x++) {
            for (let y = 0; y < matrix.length; y++) {
                this.matrix[x][y].visited = false;
            }
        }
    }

    // returns the variant with maximum positions that would be covered, doesn't consider color rank
    // TODO how is the color rank calculated?
    selectOptimalMove(
        variants: { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] }[],
    ): { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] } {
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

    colorTiles(
        positions: [{ x: number; y: number; color: string; visited?: boolean }],
        color: string,
        matrix: [{ x: number; y: number; color: string }[]] | [],
    ): void {
        for (let index = 0; index < positions.length; index++) {
            const position = positions[index];
            matrix[position.x][position.y].color = color;
        }
    }

    isBoardFilled(matrix: [{ x: number; y: number; color: string; visited?: boolean }[]] | []): boolean {
        const colors = new Set();
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

    addStep(variant: { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] }): void {
        this.steps.push(variant);
    }

    getPossibleMoves(): { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] }[] {
        const allVariants: {
            color: string;
            positions: [{ x: number; y: number; color: string; visited?: boolean }];
        }[] = [];

        knownColors.forEach((color) => {
            // get neigbors of the origin with the origin color
            //      for each of them
            //          get their neighbors with the new color
            const setOfPositions = new Set();
            const collector: { x: number; y: number; color: string; visited?: boolean }[] = [];

            const originColor = this.matrix[0][0].color;

            // get neighbors of the origin with the origin color
            this.calculateForColor(originColor, 0, 0, collector, this.matrix);

            // for each run we need to add the origin
            collector.push(this.matrix[0][0]);

            collector.forEach((element) => {
                setOfPositions.add(element);
            });

            this.resetVisitedFlag(this.matrix);

            const collectorNeighborsOfNeighbors: { x: number; y: number; color: string; visited?: boolean }[] = [];

            // for each of the origin neighbors get the neightbors with the desired color
            for (let index = 0; index < collector.length; index++) {
                const originNeighbor = collector[index];
                this.calculateForColor(
                    color,
                    originNeighbor.x,
                    originNeighbor.y,
                    collectorNeighborsOfNeighbors,
                    this.matrix,
                );
            }

            collectorNeighborsOfNeighbors.forEach((element) => {
                setOfPositions.add(element);
            });

            const variant = {
                color,
                // positions: Array.from(setOfPositions) as [{ x: number; y: number; color: string; visited?: boolean }],
                positions: Array.from(setOfPositions),
            };

            // @ts-ignore
            allVariants.push(variant);
            this.resetVisitedFlag(this.matrix);
        });

        return allVariants;
    }

    calculateAndMove(): { color: string; positions: [{ x: number; y: number; color: string; visited?: boolean }] }[] {
        let isBoardFilled = false;

        do {
            const allVariants = this.getPossibleMoves();

            const variant = this.selectOptimalMove(allVariants);

            this.addStep(variant);

            this.colorTiles(variant.positions, variant.color, this.matrix);

            isBoardFilled = this.isBoardFilled(this.matrix);
        } while (isBoardFilled === false);

        console.log(`Finished game after ${this.steps.length} moves`);

        return this.steps;
    }
}
