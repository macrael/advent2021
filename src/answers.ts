import { readLines } from "./lib.ts";
import { parseTape, runAimProgram, runMisreadProgram } from "./day2.ts";
import { calculateGE, gammaRate, oxygenRating } from "./day3.ts";
import { firstWinner, lastWinner, loadRoom, scoreWinner } from "./day4.ts";
import { chartDiagsToo, chartLines, countOverlaps } from "./day5.ts";
import { fishTickTock, sumCounts, tickTockCounter } from "./day6.ts";
import { cheapestAccurateAlignment, cheapestAlignment } from "./day7.ts";

async function day2() {
  const inputs = await Deno.readTextFile("src/data/2.txt");
  const lines = inputs.trim().split("\n");

  const p = parseTape(lines);
  const sub = runMisreadProgram(p);

  const sum = sub.depth * sub.horizontal;
  console.log("Day 2a: misread", { sub, sum });

  const trueSub = runAimProgram(p);

  const aimSum = trueSub.depth * trueSub.horizontal;
  console.log("Day 2b: aimed", { trueSub, aimSum });
}

async function day3() {
  const lines = await readLines("src/data/3.txt");

  const gamma = gammaRate(lines);
  const [g, e] = calculateGE(gamma);
  const power = g * e;

  console.log("Day 3a: ", { g, e, power });

  const o2 = oxygenRating(lines);
  const co2 = oxygenRating(lines, true);
  const gen = o2 * co2;

  console.log("Day 3b: ", { o2, co2, gen });
}

async function day4() {
  const inputs = await Deno.readTextFile("src/data/4.txt");

  const room = loadRoom(inputs.trim());
  const winner = firstWinner(room);
  const score = scoreWinner(winner);

  console.log("Day 4a: ", { lastNum: winner.lastNumber, score });

  const loseRoom = loadRoom(inputs.trim());
  const loser = lastWinner(loseRoom);
  const loserScore = scoreWinner(loser);

  console.log("Day 4b: ", { lastNum: loser.lastNumber, loserScore });
}

async function day5() {
  const lines = await readLines("src/data/5.txt");

  const chart = chartLines(lines);
  const overlaps = countOverlaps(chart);

  console.log("Day 5a: ", { overlaps });

  const diagsChart = chartDiagsToo(lines);
  const diagsOverlaps = countOverlaps(diagsChart);

  console.log("Day 5b: ", { diagsOverlaps });
}

async function day6() {
  const inputs = await Deno.readTextFile("src/data/6.txt");

  const initialFish = inputs.trim().split(",").map(Number);

  const day80 = fishTickTock(initialFish, 80);

  console.log("Day 6a: ", { day80: day80.length });

  const day256 = tickTockCounter(initialFish, 256);

  console.log("Day 6b ", { day256: sumCounts(day256) });
}

async function day7() {
  const inputs = await Deno.readTextFile("src/data/7.txt");

  const crabs = inputs.trim().split(",").map(Number);

  const cheap = cheapestAlignment(crabs);

  console.log("Day 7a: ", { cheap });

  const lessCheap = cheapestAccurateAlignment(crabs);

  console.log("Day 7b: ", { lessCheap });
}

day2();
day3();
day4();
day5();
day6();
day7();
