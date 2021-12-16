import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { buildGraph, spelunking, confidentSplunking } from "./day12.ts"

Deno.test("little splunker", () => {

  const tinyIns = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`.trim()

  const tinyCave = buildGraph(tinyIns.split('\n'))

  console.log(tinyCave)

  const allPaths = spelunking(tinyCave)
  console.log("allPaths", allPaths)

  assertEquals(allPaths.length, 10);

});

Deno.test('medium splunking', () => {

  const medIns = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`.trim()

  const mediumCave = buildGraph(medIns.split('\n'))

  console.log(mediumCave)

  const allPaths = spelunking(mediumCave)
  allPaths.sort()
  console.log("allPaths", allPaths)

  assertEquals(allPaths.length, 19);

})

Deno.test("little confident splunker", () => {

  const tinyIns = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`.trim()

  const tinyCave = buildGraph(tinyIns.split('\n'))

  console.log(tinyCave)

  const allPaths = confidentSplunking(tinyCave)
  allPaths.sort()
  console.log("confident Paths", allPaths)

  assertEquals(allPaths.length, 36);

});

Deno.test('medium confident splunking', () => {

  const medIns = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`.trim()

  const mediumCave = buildGraph(medIns.split('\n'))

  console.log(mediumCave)

  const allPaths = confidentSplunking(mediumCave)
  allPaths.sort()
  console.log("allPaths", allPaths)

  assertEquals(allPaths.length, 103);

})
