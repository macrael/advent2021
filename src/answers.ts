import { readLines, sum } from "./lib.ts";
import { parseTape, runAimProgram, runMisreadProgram } from "./day2.ts";
import { calculateGE, gammaRate, oxygenRating } from "./day3.ts";
import { firstWinner, lastWinner, loadRoom, scoreWinner } from "./day4.ts";
import { chartDiagsToo, chartLines, countOverlaps } from "./day5.ts";
import { fishTickTock, sumCounts, tickTockCounter } from "./day6.ts";
import { cheapestAccurateAlignment, cheapestAlignment } from "./day7.ts";
import { countEasyOnes, readWiring, solveMystery } from "./day8.ts";
import { basin, localMinima, localMinimaPts, parseMap } from "./day9.ts";
import {
  CorruptedError,
  countCompletionPoints,
  countCorruptedPoints,
  parseLine,
} from "./day10.ts";
import { countFlashes, firstSyncFlash, parseStartingInput } from "./day11.ts";
import { buildGraph, confidentSplunking, spelunking } from "./day12.ts";
import { countDots, foldAll, foldit, setupPaper } from "./day13.ts";
import { calculateStats, expandForty, expandX, readExpanse } from "./day14.ts";
import { parseFullCave, parseGraph, safestPath } from "./day15.ts";
import { computePacket, parsePacket, sumVersions } from "./day16.ts";
import { addSnails, magnitude, maxMag, readSnailNumber } from "./day18.ts";
import {
  discoverAllBeacons,
  maxManhattenDist,
  parseScanners,
} from "./day19.ts";
import { countPixels, enhanceImage, padImage, printImage, flipEdge } from "./day20.ts";

async function day2() {
  const inputs = await Deno.readTextFile("src/data/2.txt");
  const lines = inputs.trim().split("\n");

  const p = parseTape(lines);
  const sub = runMisreadProgram(p);

  const sum = sub.depth * sub.horizontal;
  console.log("Day 2a: ", { sub, sum });

  const trueSub = runAimProgram(p);

  const aimSum = trueSub.depth * trueSub.horizontal;
  console.log("Day 2b: ", { trueSub, aimSum });
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

  console.log("Day 6b: ", { day256: sumCounts(day256) });
}

async function day7() {
  const inputs = await Deno.readTextFile("src/data/7.txt");

  const crabs = inputs.trim().split(",").map(Number);

  const cheap = cheapestAlignment(crabs);

  console.log("Day 7a: ", { cheap });

  const lessCheap = cheapestAccurateAlignment(crabs);

  console.log("Day 7b: ", { lessCheap });
}

async function day8() {
  const lines = await readLines("src/data/8.txt");

  const mystery = readWiring(lines);
  const easies = countEasyOnes(mystery);

  console.log("Day 8a: ", { easies });

  const allDigits = mystery.map((m) => solveMystery(m));

  const sum = allDigits.reduce((acc, d) => acc + d, 0);
  console.log("Day 8b: ", { sum });
}

async function day9() {
  const inputs = await Deno.readTextFile("src/data/9.txt");
  const square = inputs.trim();

  const map = parseMap(square);

  const mins = localMinima(map);

  const powerLevel = sum(mins.map((m) => m + 1));

  console.log("Day 9a: ", { powerLevel });

  const minpts = localMinimaPts(map);

  const basins = minpts.map((min) => basin(map, min[0], min[1]));

  const sizes = basins.map((b) => b.length);
  const topThree = sizes.sort((a, b) => b - a).splice(0, 3);

  const mult = topThree.reduce((acc, l) => acc * l, 1);
  console.log("Day 9b: ", { mult });
}

async function day10() {
  const lines = await readLines("src/data/10.txt");
  const results = lines.map((l) => parseLine(l));
  const corrupted = results.filter((r) =>
    r instanceof CorruptedError
  ) as CorruptedError[];

  const corruptedPoints = countCorruptedPoints(corrupted);

  console.log("Day10a: ", { corruptedPoints });

  const completions = results.filter((r) => typeof r === "string") as string[];

  const scores = completions.map((c) => countCompletionPoints(c));

  scores.sort((a, b) => a - b);
  const middleIDX = Math.floor(scores.length / 2);
  const middle = scores[middleIDX];

  console.log("Day10b: ", { middle });
}

async function day11() {
  const inputs = await Deno.readTextFile("src/data/11.txt");

  const onehundreadoctos = parseStartingInput(inputs);
  const flashes = countFlashes(onehundreadoctos, 100);

  console.log("Day11a: ", { flashes });

  const allTogetherOctos = parseStartingInput(inputs);
  const firstTogether = firstSyncFlash(allTogetherOctos);

  console.log("Day11b: ", { firstTogether });
}

async function day12() {
  const lines = await readLines("src/data/12.txt");
  const bigCave = buildGraph(lines);

  const allPaths = spelunking(bigCave);
  const pathsCount = allPaths.length;
  console.log("Day12a: ", { pathsCount });

  const confidentPaths = confidentSplunking(bigCave);
  const confidentCount = confidentPaths.length;
  console.log("Day12b: ", { confidentCount });
}

async function day13() {
  const inputs = await Deno.readTextFile("src/data/13.txt");

  const origami = setupPaper(inputs.trim());
  const firstFold = foldit(origami.paper, origami.instructions[0]);

  const firstCount = countDots(firstFold);

  console.log("Day13a: ", { firstCount });

  const final = foldAll(origami);
  // console.log(viewPaper(final))

  console.log("Day13b: ", { "letters": "LGHEGUEJ" });
}

async function day14() {
  const inputs = await readLines("src/data/14.txt");

  const [base, rules] = readExpanse(inputs);

  const tenX = expandX(base, rules);
  const stats = calculateStats(tenX);

  console.log("day14a: ", { stats });

  const fortyX = expandForty(base, rules);

  console.log("day14a: ", { fortyX });
}

async function day15() {
  const inputs = await Deno.readTextFile("src/data/15.txt");

  const nodes = parseGraph(inputs.trim());

  const minRisk = safestPath(nodes);

  console.log("Day15a: ", { minRisk });

  const fullNodes = parseFullCave(inputs.trim());
  const maxRisk = safestPath(fullNodes);

  console.log("Day15b: ", { maxRisk });
}

async function day16() {
  const inputs = await Deno.readTextFile("src/data/16.txt");

  const ast = parsePacket(inputs.trim());

  const sum = sumVersions(ast);

  console.log("Day16a: ", { sum });

  const compute = computePacket(ast);

  console.log("Day16b: ", { compute });
}

function day17() {
  console.log("Day17a: ", { maxy: 8256 });
  console.log("Day17b: ", { count: 2326 });
}

async function day18() {
  const inputs = await readLines("src/data/18.txt");
  const snails = inputs.map(readSnailNumber);

  const head = snails[0];
  const tail = snails.splice(1);

  const sum = tail.reduce((acc, snail) => addSnails(acc, snail), head);
  const mag = magnitude(sum);

  console.log("Day18a: ", { mag });

  const biggestPair = maxMag(inputs);

  console.log("Day18b: ", { biggestPair });
}

async function day19() {
  const inputs = await Deno.readTextFile("src/data/19.txt");

  const scanners = parseScanners(inputs.trim());
  const [allBeacons, allLocs] = discoverAllBeacons(scanners);

  // my computation was off by one. Distressing!
  console.log("Day19a: ", { count: allBeacons.length });
  // not 513, 512.

  const maxDist = maxManhattenDist(allLocs);

  console.log("Day19b: ", { maxDist });
}

async function day20() {
  const inputs = await Deno.readTextFile("src/data/20.txt");

  const [enhancer, imageStr] = inputs.trim().split("\n\n");

  const image = padImage(imageStr);
  console.log(printImage(image));

  const enhanceOne = enhanceImage(image, enhancer);
  flipEdge(enhanceOne)
  console.log(printImage(enhanceOne));
  const enhanceTwo = enhanceImage(enhanceOne, enhancer);
  console.log(printImage(enhanceTwo));  

  console.log(printImage(enhanceTwo));

  const litPix = countPixels(enhanceTwo);

  console.log("Day20a: ", { litPix });

  // do it 50 x
  let enhanced = padImage(imageStr);
  for (let i = 0; i < 50; i ++) {
    enhanced = enhanceImage(enhanced, enhancer)

    if (i % 2 === 0) {
      flipEdge(enhanced)
    }
  }

  console.log(printImage(enhanced));

  const fiftyLitPix = countPixels(enhanced);

  console.log("Day20b: ", {fiftyLitPix})

}

// day2();
// day3();
// day4();
// day5();
// day6();
// day7();
// day8();
// day9();
// day10();
// day11();
// day12();
// day13();
// day14();
// day15();
// day16();
// day17();
// day18();
// day19();
day20();
