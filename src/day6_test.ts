import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import {fishTick, fishTickTock, initialCount, tickCounter, tickTockCounter, sumCounts} from './day6.ts'

Deno.test("fish swim", () => {

  const initialFish = [3,4,3,1,2]

  const oneDay = fishTick(initialFish)

  assertEquals(oneDay, [2,3,2,0,1])

  const twoDay = fishTick(oneDay)

  assertEquals(twoDay, [1,2,1,6,8,0])

  const threeDay = fishTick(twoDay)

  assertEquals(threeDay, [0,1,0,5,7,6,8])
});

Deno.test("fish swim", () => {

  const initialFish = [3,4,3,1,2]

  const counter = initialCount(initialFish)

  assertEquals(counter, [0,1,1,2,1,0,0,0,0])

  const day1 = tickCounter(counter)

  assertEquals(day1, initialCount([2,3,2,0,1]))

  const day2 = tickCounter(day1)
  assertEquals(day2, initialCount([1,2,1,6,8,0]))

  const day3 = tickCounter(day2)
  assertEquals(day3, initialCount([0,1,0,5,7,6,8]))

});

Deno.test("fish swimulator", () => {

  const initialFish = [3,4,3,1,2]

  const day80 = fishTickTock(initialFish, 80)

  assertEquals(day80.length, 5934)
});

Deno.test("fish countulator", () => {

  const initialFish = [3,4,3,1,2]

  const day80 = tickTockCounter(initialFish, 80)

  assertEquals(sumCounts(day80), 5934)
});
