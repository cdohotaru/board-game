type AppErrorTemplateType = {
    [name: string]: {
        template: string;
        code: string;
    };
};

type Tile = {
    x: number;
    y: number;
    color: string;
    visited?: boolean;
};

type Column = {
    array: Array<Tile>;
};

type Matrix = {
    items: Array<Tile>[];
};

// [{ x: number; y: number; color: string; visited?: boolean }[]];
// export const testValues = [
//     [
//         { x: 0, y: 0, color: "green" },
//         { x: 0, y: 1, color: "red" },
//         { x: 0, y: 2, color: "blue" },
//         { x: 0, y: 3, color: "red" },
//     ],
//     [
//         { x: 1, y: 0, color: "red" },
//         { x: 1, y: 1, color: "blue" },
//         { x: 1, y: 2, color: "red" },
//         { x: 1, y: 3, color: "red" },
//     ],
//     [
//         { x: 2, y: 0, color: "green" },
//         { x: 2, y: 1, color: "blue" },
//         { x: 2, y: 2, color: "blue" },
//         { x: 2, y: 3, color: "green" },
//     ],
//     [
//         { x: 3, y: 0, color: "red" },
//         { x: 3, y: 1, color: "blue" },
//         { x: 3, y: 2, color: "red" },
//         { x: 3, y: 3, color: "red" },
//     ],
// ];
