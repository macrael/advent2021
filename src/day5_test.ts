import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { chartDiagsToo, chartLines, countOverlaps } from "./day5.ts";

Deno.test("55555", () => {
  const ins = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`.trim();

  const lines = ins.split("\n");
  const ventMap = chartLines(lines);

  const shortMap = ventMap.slice(0, 10);
  console.log(shortMap.length);

  for (const row of shortMap) {
    console.log(row.slice(0, 10));
  }

  const overlaps = countOverlaps(ventMap);

  assertEquals(overlaps, 5);
});

Deno.test("55555diag", () => {
  const ins = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`.trim();

  const lines = ins.split("\n");
  const ventMap = chartDiagsToo(lines);

  const shortMap = ventMap.slice(0, 10);
  console.log(shortMap.length);

  for (const row of shortMap) {
    console.log(row.slice(0, 10).join());
  }

  const overlaps = countOverlaps(ventMap);

  assertEquals(overlaps, 12);
});
