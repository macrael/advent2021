type VentChart = number[][];

export function chartLines(lines: string[]): VentChart {
  // looking at our input, the max width/height is less than 1000
  const chart = [];
  for (let i = 0; i < 1000; i++) {
    chart.push(new Array(1000).fill(0));
  }

  for (const line of lines) {
    const parts = line.split(/ -> /);
    const from = parts[0].split(",").map(Number);
    const to = parts[1].split(",").map(Number);

    // for now, ignore diagonal lines
    if (!(from[0] === to[0] || from[1] === to[1])) {
      continue;
    }
    // console.log("FROM", from, "TO, ", to);

    const minX = Math.min(from[0], to[0]);
    const maxX = Math.max(from[0], to[0]);
    const minY = Math.min(from[1], to[1]);
    const maxY = Math.max(from[1], to[1]);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        // console.log("PBLIE", x, y)
        chart[y][x] += 1;
      }
    }
  }

  return chart;
}

function stepDirection(low: number, high: number): number {
  if (low == high) {
    return 0;
  }
  if (low < high) {
    return 1;
  }
  if (low > high) {
    return -1;
  }
  throw new Error("thats all folks");
}

export function chartDiagsToo(lines: string[]): VentChart {
  // looking at our input, the max width/height is less than 1000
  const chart = [];
  for (let i = 0; i < 1000; i++) {
    chart.push(new Array(1000).fill(0));
  }

  for (const line of lines) {
    const parts = line.split(/ -> /);
    const from = parts[0].split(",").map(Number);
    const to = parts[1].split(",").map(Number);

    // console.log("FROM", from, "TO, ", to);
    // Diagonal Lines
    const xIncrement = stepDirection(from[0], to[0]);
    const yIncrement = stepDirection(from[1], to[1]);

    let x = from[0];
    let y = from[1];
    chart[y][x] += 1;
    // console.log("DIAG ", x, y);
    do {
      x += xIncrement;
      y += yIncrement;

      // console.log("DIAG ", x, y);

      chart[y][x] += 1;
    } while (!(x === to[0] && y === to[1]));
  }

  return chart;
}

export function countOverlaps(chart: VentChart): number {
  let overlaps = 0;
  for (const row of chart) {
    for (const count of row) {
      if (count > 1) {
        overlaps += 1;
      }
    }
  }

  return overlaps;
}
