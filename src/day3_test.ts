import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateGE, gammaRate, oxygenRating } from "./day3.ts";

Deno.test("read the matrix", () => {
  const ins = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  const gamma = gammaRate(ins);

  assertEquals(gamma, "10110");

  const [g, e] = calculateGE(gamma);

  assertEquals(g, 22);
  assertEquals(e, 9);
});

Deno.test("cross the matrix", () => {
  const ins = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  const o2 = oxygenRating(ins);

  assertEquals(o2, 23);

  const co2 = oxygenRating(ins, true);

  assertEquals(co2, 10);
});
