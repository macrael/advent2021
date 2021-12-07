import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { alignCrabs, alignCrabsAccurately, cheapestAlignment } from "./day7.ts";

Deno.test("this time its math", () => {
  // maybe we can binary search this? I don't think it's NP

  const crabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  console.log("crab", crabs);

  for (let i = 0; i < 17; i++) {
    const sum = alignCrabs(crabs, i);
    console.log(`${i}: ${sum}`);
  }

  const cheap = cheapestAlignment(crabs);
  assertEquals(cheap, 37);
});

Deno.test("accurate math", () => {
  // maybe we can binary search this? I don't think it's NP

  const crabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  console.log("crab", crabs);

  assertEquals(alignCrabsAccurately(crabs, 5), 168);
});
