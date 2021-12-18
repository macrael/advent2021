import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { readSnailNumber, writeSnailNumber, reduceSnail } from "./day18.ts";

Deno.test("count it", () => {
  const ins = "[[[[1,2],[3,4]],[[5,6],[7,8]]],9]";

  const three = readSnailNumber(ins);
  console.log("THREE", three);

  const out = writeSnailNumber(three);

  assertEquals(out, ins)
  assertEquals(three.right, 9);
});


Deno.test("reduce it", () => {
  const ins = "[[[[[9,8],1],2],3],4]";

  const over = readSnailNumber(ins);

  const reduced = reduceSnail(over);

  assertEquals(writeSnailNumber(reduced), '[[[[0,9],2],3],4]')

  
});

