import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  checkBoard,
  firstWinner,
  lastWinner,
  loadBoard,
  loadRoom,
  playNumber,
  printBoard,
  scoreWinner,
} from "./day4.ts";

Deno.test("load board", () => {
  const ins = `
22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19
 `.trim();

  const b = loadBoard(ins);

  const expectedNums = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  const expectedBoard = expectedNums.map((row) => {
    return row.map((num) => {
      return [num, false];
    });
  });

  assertEquals(b, expectedBoard);
});

Deno.test("play number", () => {
  const ins = `
22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19
 `.trim();

  const b = loadBoard(ins);

  const nums = [1, 99, 4, 7];

  for (const num of nums) {
    playNumber(b, num);
  }

  for (const row of b) {
    for (const cell of row) {
      const num = cell[0];
      const played = cell[1];

      assertEquals(played, nums.includes(num));
    }
  }
});

Deno.test("wins", () => {
  const ins = `
22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19
 `.trim();

  const vert = loadBoard(ins);

  assertEquals(checkBoard(vert), undefined);

  const nums = [1, 99, 4, 7, 13, 2, 9, 10, 12];

  for (const num of nums) {
    playNumber(vert, num);
  }

  assertEquals(checkBoard(vert), [13, 2, 9, 10, 12]);

  const horiz = loadBoard(ins);

  const hnums = [1, 99, 4, 7, 13, 2, 9, 10, 6, 3, 18, 5];

  for (const num of hnums) {
    playNumber(horiz, num);
  }

  assertEquals(checkBoard(horiz), [6, 10, 3, 18, 5]);
});

Deno.test("play Game", () => {
  const ins = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`.trim();

  const room = loadRoom(ins);

  const winner = firstWinner(room);

  assertEquals(scoreWinner(winner), 4512);
});

Deno.test("play to lose", () => {
  const ins = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`.trim();

  const room = loadRoom(ins);

  const winner = lastWinner(room);

  console.log("that inner", winner.lastNumber);
  printBoard(winner.board);

  assertEquals(scoreWinner(winner), 1924);
});

Deno.test("thats not a winner", () => {
  const ins = `
74 79 30 14 35
90 52 17 29 63
18 69 78 34 26
92 42 85 71 56
12  2  5  0 98
`.trim();

  const b = loadBoard(ins);

  const nums = [6, 69, 28, 50, 36, 84, 49, 13, 48, 90, 1, 33, 71, 0];

  for (const num of nums) {
    playNumber(b, num);
  }

  printBoard(b);

  assertEquals(checkBoard(b), undefined);
});
