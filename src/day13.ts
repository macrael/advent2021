type Paper = ("#" | undefined)[][]

interface Origami {
  paper: Paper;
  instructions: string[];
}

export function viewPaper(paper: Paper): string {
  return paper.map(line => line.map(pt => pt || '.').join('')).join('\n')
}

function blankPage(width: number, height: number) {
  const paper: Paper = [];
  for (let i = 0; i < height; i++) {
    paper.push(new Array(width).fill(undefined));
  }
  return paper
}

export function setupPaper(input: string): Origami {

  const [points, instructions] = input.split('\n\n')

  const paper = blankPage(2000, 2000)

  for (const point of points.split('\n')) {
    const [x, y] = point.split(',').map(Number)
    paper[y][x] = "#"

  }

  return {
    paper,
    instructions: instructions.split('\n'),
  }

}

export function countDots(paper: Paper) {
  let count = 0
  for (const row of paper) {
    for (const pt of row) {
      if (pt) {
        count++
      }
    }
  }
  return count
}

export function foldit(paper: Paper, inst: string): Paper {

  const [_fold, _along, cords] = inst.split(' ')
  const [axis, lineS] = cords.split('=')

  const line = Number(lineS)

  if (axis === 'y') {
    const newX = paper[0].length
    const newY = Math.floor(line)

    const folded = blankPage(newX, newY)

    for (let y = 0; y < newY; y++) {
      for (let x = 0; x < newX; x++) {
        const first = paper[y][x]
        const second = paper[(line * 2) - y][x]

        // console.log(`${x}, ${y} :: ${x} ${newY - 1 - y}`, first, second, first || second)

        folded[y][x] = first || second
      }
    }

    return folded
  } else if (axis === 'x') {
    const newX = Math.floor(line)
    const newY = Math.floor(paper.length)

    const folded = blankPage(newX, newY)

    for (let y = 0; y < newY; y++) {
      for (let x = 0; x < newX; x++) {
        const first = paper[y][x]
        const second = paper[y][line * 2 - x]

        // console.log(`${x}, ${y} :: ${x} ${newY - 1 - y}`, first, second, first || second)

        folded[y][x] = first || second
      }
    }

    return folded
  }
  return []
}

export function foldAll(orig: Origami): Paper {

  let current = orig.paper
  for (const inst of orig.instructions) {
    current = foldit(current, inst)
  }

  return current

}
