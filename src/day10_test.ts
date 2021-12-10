import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseLine, CorruptedError, countCorruptedPoints, countCompletionPoints } from "./day10.ts";

Deno.test("cparser", () => {
  const ins = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

  const lines = ins.trim().split("\n");

  const results = lines.map( l => parseLine(l))

  const corrupted = results.filter(r => r instanceof CorruptedError) as CorruptedError[]

  console.log('corrupted', corrupted.length)
  const points = countCorruptedPoints(corrupted)
  assertEquals(points, 26397);

  // 2

  const completions = results.filter(r => typeof r === 'string') as string[]

  console.log(completions)

  const scores = completions.map(c => countCompletionPoints(c))

  scores.sort((a, b) => a - b)
  console.log('completions', scores)
  const middleIDX = Math.floor(scores.length / 2)
  console.log('middleIDX', middleIDX)
  const middle = scores[middleIDX]

  console.log('middle', middle)

  assertEquals(middle, 288957);
});
