// start 11:00
// finish part 1 at 12:00
// finish part 2 at 1:03. and it takes a LONG time to run. 

type Coord = [number, number];

interface node {
  coord: Coord;
  risk: number;
  minDistance: number;
  edges: node[];
}

export function neighbors(
  i: number,
  j: number,
  width: number,
  height: number,
): Coord[] {
  const possible: Coord[] = [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ];

  const actual = possible.filter((pts) =>
    !(
      pts[0] < 0 ||
      pts[1] < 0 ||
      pts[0] >= width ||
      pts[1] >= height
    )
  );

  return actual;
}

export function key(i: number, j: number): string {
  return `${i},${j}`;
}

function coord(key: string): Coord {
  const [is, js] = key.split(",");
  const [i, j] = [is, js].map(Number);

  return [i, j];
}

export function parseGraph(input: string): { [name: string]: node } {
  const nodes: { [name: string]: node } = {};

  const lines = input.split("\n");
  const width = lines[0].length;
  const height = lines.length;

  console.log("W", width, height);

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const val = Number(lines[j][i]);
      const neighs = neighbors(i, j, lines[0].length, lines.length);

      const c = key(i, j);
      if (!(c in nodes)) {
        nodes[c] = {
          coord: [i, j],
          risk: val,
          minDistance: Number.MAX_VALUE,
          edges: [],
        };
      }

      for (const edge of neighs) {
        const k = key(edge[0], edge[1]);

        if (!(k in nodes)) {
          const eVal = Number(lines[edge[1]][edge[0]]);
          nodes[k] = {
            coord: [edge[0], edge[1]],
            risk: eVal,
            minDistance: Number.MAX_VALUE,
            edges: [],
          };
        }

        const n = nodes[k];
        nodes[c].edges.push(n);
      }
    }
  }

  nodes["start"] = nodes[key(0, 0)];
  nodes["end"] = nodes[key(width - 1, height - 1)];

  return nodes;
}

export function parseFullCave(input: string): { [name: string]: node } {
  const nodes: { [name: string]: node } = {};

  const lines = input.split("\n");
  const width = lines[0].length;
  const height = lines.length;

  console.log("W", width, height);
  const fullWidth = width * 5;
  const fullHeight = height * 5;

  for (let j = 0; j < fullHeight; j++) {
    for (let i = 0; i < fullWidth; i++) {
      const mapi = i % width;
      const mapj = j % height;

      const mapVal = Number(lines[mapj][mapi]);

      const modi = Math.floor(i / width);
      const modj = Math.floor(j / height);

      const val = (mapVal + modi + modj) % 9 || 9;

      if (j === 0) {
        console.log(`${i}: m:${mapi} b:${mapVal} mi:${modi} mj:${modj} vv:${val}`)
      }

      const neighs = neighbors(i, j, fullWidth, fullHeight);

      const c = key(i, j);
      if (!(c in nodes)) {
        // console.log('c', c, val)
        nodes[c] = {
          coord: [i, j],
          risk: val,
          minDistance: Number.MAX_VALUE,
          edges: [],
        };
      }

      for (const edge of neighs) {
        const k = key(edge[0], edge[1]);

        if (!(k in nodes)) {
          const mapi = edge[0] % width;
          const mapj = edge[1] % height;

          const mapVal = Number(lines[mapj][mapi]);

          const modi = Math.floor(edge[0] / width);
          const modj = Math.floor(edge[1] / height);

          // forgive me.
          const eVal = (mapVal + modi + modj) % 9 || 9;

          if (edge[1] === 0) {
            console.log(`aa/${edge[0]}: m:${mapi} b:${mapVal} mi:${modi} mj:${modj} vv:${eVal}`)
          }

          if (k === '10,0') {
            console.log("WAT 10,0", eVal)
          }

          // const eVal = Number(lines[edge[1]][edge[0]]);
          // console.log('e', k, eVal)
          nodes[k] = {
            coord: [edge[0], edge[1]],
            risk: eVal,
            minDistance: Number.MAX_VALUE,
            edges: [],
          };
        }

        const n = nodes[k];
        nodes[c].edges.push(n);
      }
    }
  }

  nodes["start"] = nodes[key(0, 0)];
  nodes["end"] = nodes[key(fullWidth - 1, fullHeight - 1)];

  return nodes;
}

export function safestPath(nodes: { [name: string]: node }): number {
  // Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set
  const unvisited = new Set(Object.values(nodes));

  // set distance at start to 0
  nodes["start"].minDistance = 0;

  let current = nodes["start"];

  // for (let i = 0; i < 400; i++) {
  while (true) {
    if (unvisited.size % 1000 === 0) {
      console.log('unvisited', unvisited.size)
    }
    for (const edge of current.edges) {
      if (unvisited.has(edge)) {
        const calculatedDistance = current.minDistance + edge.risk;

        edge.minDistance = Math.min(calculatedDistance, edge.minDistance);
      }
    }

    if (current === nodes["end"]) {
      console.log("BREAKING NEWS", current);
      break;
    }

    unvisited.delete(current);
    current = unvisited.values().next().value;

    for (const un of unvisited) {
      if (un.minDistance < current.minDistance) {
        current = un;
      }
    }
  }

  console.log("WE FINISHED>", nodes["end"].minDistance);

  for (let j = 0; j <= nodes["end"].coord[1]; j++) {
    const row = [];
    for (let i = 0; i <= nodes["end"].coord[1]; i++) {
      const k = key(i, j);
      row.push(nodes[k].minDistance);
    }
    console.log(row.join(","));
  }

  return nodes["end"].minDistance;
}
