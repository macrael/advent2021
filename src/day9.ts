export function parseMap(s: string): number[][] {
  return s.split("\n").map((l) => l.split("").map((i) => Number(i)));
}

export function neighbors(map: number[][], i: number, j: number) {
  const possible = [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ];

  const actual = possible.filter((pts) =>
    !(
      pts[0] < 0 ||
      pts[1] < 0 ||
      pts[0] >= map[0].length ||
      pts[1] >= map.length
    )
  );

  return actual.map((pts) => map[pts[1]][pts[0]]);
}

export function localMinimaPts(map: number[][]): [number, number][] {
  const mins: [number, number][] = [];
  for (let j = 0; j < map.length; j++) {
    for (let i = 0; i < map[0].length; i++) {
      const test = map[j][i];
      const neigh = neighbors(map, i, j);
      if (neigh.every((n) => n > test)) {
        mins.push([i, j]);
      }
    }
  }
  return mins;
}

export function localMinima(map: number[][]): number[] {
  return localMinimaPts(map).map((pt) => map[pt[1]][pt[0]]);
}

export function basin(
  map: number[][],
  initialI: number,
  initialJj: number,
): number[] {
  const seen: [number, number][] = [];
  const toSee: [number, number][] = [[initialI, initialJj]];

  while (toSee.length > 0) {
    // console.log(seen, '||' , toSee)

    const next = toSee.shift();
    if (next == undefined) {
      throw new Error("no bloody likely");
    }
    const i = next[0];
    const j = next[1];
    seen.push(next);

    const possible: [number, number][] = [
      [i - 1, j],
      [i, j + 1],
      [i + 1, j],
      [i, j - 1],
    ];

    const actual = possible.filter((pts) =>
      !(
        pts[0] < 0 ||
        pts[1] < 0 ||
        pts[0] >= map[0].length ||
        pts[1] >= map.length ||
        map[pts[1]][pts[0]] == 9 ||
        seen.some((s) => s[0] === pts[0] && s[1] === pts[1]) ||
        toSee.some((s) => s[0] === pts[0] && s[1] === pts[1])
      )
    );

    for (const pt of actual) {
      toSee.push(pt);
    }
  }

  return seen.map(pt => map[pt[1]][pt[0]])
}
