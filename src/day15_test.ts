import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseGraph, safestPath, parseFullCave, key } from "./day15.ts"

Deno.test("djistra", () => {
  const ins = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`.trim();

  const nodes = parseGraph(ins)
  // console.log("NO", nodes)

  const minRisk = safestPath(nodes)

  assertEquals(minRisk, 40)

  const fullNodes = parseFullCave(ins)

  const line = []
  for (let i = 0; i < 50; i++) {
    const k = key(i, 0)
    console.log('k', k, fullNodes[k].risk)
    line.push(fullNodes[k].risk)
  }
  console.log("TOP", line.join(''))

  const maxRisk = safestPath(fullNodes)

  assertEquals(maxRisk, 315)

});
