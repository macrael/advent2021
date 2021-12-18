import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { readSnailNumber, writeSnailNumber, reduceSnail, addSnails, magnitude, maxMag } from "./day18.ts";

Deno.test("count it", () => {
  const ins = "[[[[1,2],[3,4]],[[5,6],[7,8]]],9]";

  const three = readSnailNumber(ins);
  console.log("THREE", three);

  const out = writeSnailNumber(three);

  assertEquals(out, ins)
});


Deno.test("reduce it", () => {
  const ins = "[[[[[9,8],1],2],3],4]";

  const over = readSnailNumber(ins);

  const reduced = reduceSnail(over);
  console.log("REDUCED RIGHT", reduced)

  assertEquals(writeSnailNumber(reduced), '[[[[0,9],2],3],4]')

});

Deno.test("reduce it", () => {
  const ins = "[7,[6,[5,[4,[3,2]]]]]";

  const over = readSnailNumber(ins);

  const reduced = reduceSnail(over);

  console.log("REDUCED LEFT", reduced)

  assertEquals(writeSnailNumber(reduced), '[7,[6,[5,[7,0]]]]')

  
});

Deno.test("reduce it all", () => {
  const ins = "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]";

  const over = readSnailNumber(ins);

  const reduced = reduceSnail(over);

  console.log("REDUCED LEFT", reduced)

  assertEquals(writeSnailNumber(reduced), '[[3,[2,[8,0]]],[9,[5,[7,0]]]]')

  
});

Deno.test("reduce it all", () => {
  const ins = "[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]";

  const over = readSnailNumber(ins);
  const reduced = reduceSnail(over);

  assertEquals(writeSnailNumber(reduced), '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')

});

Deno.test("Add", () => {
  const a = readSnailNumber("[[[[4,3],4],4],[7,[[8,4],9]]]")
  const b = readSnailNumber('[1,1]')

  const sum = addSnails(a, b)

  assertEquals(writeSnailNumber(sum), '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')

});

Deno.test("running sum", () => {
  const ins = `
[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]
`.trim()

  const snails = ins.split('\n').map(readSnailNumber)
  const head = snails[0]
  const tail = snails.splice(1)

  const sum = tail.reduce((acc, snail) => addSnails(acc, snail), head)

  assertEquals(writeSnailNumber(sum), '[[[[5,0],[7,4]],[5,5]],[6,6]]')

});

Deno.test("running sum", () => {
  const ins = `
[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]
`.trim()

  const snails = ins.split('\n').map(readSnailNumber)
  const head = snails[0]
  const tail = snails.splice(1)

  const sum = tail.reduce((acc, snail) => addSnails(acc, snail), head)

  assertEquals(writeSnailNumber(sum), '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]')

});

Deno.test("largest sum", () => {
  const ins = `
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`.trim()

  const snails = ins.split('\n')
  const max = maxMag(snails)

  assertEquals(max, 3993)

});

Deno.test('mag', () => {

  const ins = '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
  const n = readSnailNumber(ins)

  const mag = magnitude(n)

  assertEquals(mag, 3488)

})
