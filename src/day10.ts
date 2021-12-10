// start 10:18pm
// finish part 1: 10:40 pm
// finish part 2: 10:55 pm

export class CorruptedError extends Error {
  illegalCharacter = "";

  constructor(illegalCharacter: string) {
    super("CorruptedOutput");

    this.illegalCharacter = illegalCharacter;
  }
}

const matchingDelimiters: { [opener: string]: string } = {
  '[':']',
  '(': ')',
  '<': '>',
  '{': '}',
}

const corruptedPoints: { [delimiter: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

export function parseLine(
  line: string,
): string | CorruptedError {

  const symbols = line.split('')

  const ast = []

  for (const s of symbols) {
    // if it's an opening symbol, push it onto the stack
    if (Object.keys(matchingDelimiters).includes(s)) {
      ast.push(s)
    } else {
      const opener = ast.pop()
      if (opener === undefined || matchingDelimiters[opener] !== s) {
        return new CorruptedError(s)
      }
    }
  }

  // translate the string one at a time. 
  const completion = []
  while (ast.length > 0) {
    const next = ast.pop()
    if (next === undefined) {
      throw new Error('bad compiler.')
    }
    completion.push(matchingDelimiters[next])
  }

  return completion.join('')
  
}

export function countCorruptedPoints(errs: CorruptedError[]): number {
  return errs.map(c => corruptedPoints[c.illegalCharacter]).reduce((acc, pt) => acc + pt, 0)
}

const completionPoints : { [delimiter: string]: number } = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

export function countCompletionPoints(completion: string): number {

  let score = 0;
  for (const c of completion.split('')) {
    const delta = completionPoints[c];

    score = score * 5 + delta;

  }

  return score

}

