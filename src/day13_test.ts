import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { setupPaper, viewPaper, foldit, countDots, foldAll } from "./day13.ts";

Deno.test("folding", () => {
  const ins = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`.trim();

  const origami = setupPaper(ins);

  // console.log(viewPaper(origami.paper))

  const firstFold = foldit(origami.paper, origami.instructions[0])
  console.log("FIRST\n")
  // console.log(viewPaper(firstFold))

  const count = countDots(firstFold)
  assertEquals(count, 17)


  const secondFold = foldit(firstFold, origami.instructions[1])
  console.log("SECOND\n")
  // console.log(viewPaper(secondFold))

  const secondCount = countDots(secondFold)
  assertEquals(secondCount, 16)

});

Deno.test("fold all", () => {
  const ins = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`.trim();

  const origami = setupPaper(ins);

  // console.log(viewPaper(origami.paper))

  const result = foldAll(origami)

  const secondCount = countDots(result)
  assertEquals(secondCount, 16)

});
