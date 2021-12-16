// start 11:25
// ---
// part one done at 4:48pm, less than an episode. half an hour?
// part 2 done at 5:10. 20 minutes. One bug in my valid pather. 

interface node {
  name: string;
  isBig: boolean;
  edges: node[];
}

type Path = node[];

type Cave = { [name: string]: node };

function newNode(name: string) {
  const firstC = name[0];
  const isBig = firstC === firstC.toUpperCase();

  return {
    name,
    isBig,
    edges: [],
  };
}

function addEdge(cave: Cave, from: string, to: string) {
  if (cave[from] === undefined) {
    cave[from] = newNode(from);
  }
  if (cave[to] === undefined) {
    cave[to] = newNode(to);
  }

  cave[from].edges.push(cave[to]);
  cave[to].edges.push(cave[from]);
}

function isValidNextStep(path: Path, n: node): boolean {
  if (n.isBig) {
    return true;
  }
  if (path.includes(n)) {
    return false;
  }
  return true;
}

function isValidNextStepConfidently(path: Path, n: node): boolean {
  if (n.isBig) {
    return true;
  }
  if (n.name === 'start') {
    return false;
  }

  // if the path does not yet have a repeated small, then any small is allowed
  const smalls = path.filter(p => !p.isBig )
  const smallSet = new Set(smalls)
  if (smalls.length === smallSet.size) {
    return true
  }

  // if we do have a repeated small, only new ones are allowed
  if (smallSet.has(n)) {
    return false;
  }
  return true;
}

export function buildGraph(lines: string[]): Cave {
  const cave: Cave = {};

  for (const line of lines) {
    const [from, to] = line.split("-");
    addEdge(cave, from, to);
  }

  return cave;
}

export function spelunking(cave: Cave): string[] {
  // OK, we've got to do some thinking.
  // I think we BFS? Add paths to nodes? Add visited?
  // create a Path for each edge from start
  // so a path has an end.
  // for the end of each path,
  // see what are valid next steps, based on the current path,
  // clone the path for each of those next steps, continue until a path reaches end
  // or has no valid moves.

  const paths: Path[] = [];
  paths.push([cave["start"]]);

  const finishedPaths = [];
  while (paths.length > 0) {
    const path = paths.shift();
    if (path === undefined) {
      throw new Error("not a chance");
    }
    // look at the edges of the tail
    const tail = path[path.length - 1];
    for (const next of tail.edges) {
      if (next.name === 'end') {
        const newPath = [...path, next];
        finishedPaths.push(newPath)
        continue
      }

      if (isValidNextStep(path, next)) {
        // for each valid edge, make a new path and add it to the list.
        const newPath = [...path, next];
        paths.push(newPath);
      }
    }
  }

  return finishedPaths.map((p) => p.map((n) => n.name).join(","));
}

export function confidentSplunking(cave: Cave): string[] {
  // OK, we've got to do some thinking.
  // I think we BFS? Add paths to nodes? Add visited?
  // create a Path for each edge from start
  // so a path has an end.
  // for the end of each path,
  // see what are valid next steps, based on the current path,
  // clone the path for each of those next steps, continue until a path reaches end
  // or has no valid moves.

  const paths: Path[] = [];
  paths.push([cave["start"]]);

  const finishedPaths = [];
  while (paths.length > 0) {
    const path = paths.shift();
    if (path === undefined) {
      throw new Error("not a chance");
    }
    // look at the edges of the tail
    const tail = path[path.length - 1];
    for (const next of tail.edges) {
      if (next.name === 'end') {
        const newPath = [...path, next];
        finishedPaths.push(newPath)
        continue
      }

      if (isValidNextStepConfidently(path, next)) {
        // for each valid edge, make a new path and add it to the list.
        const newPath = [...path, next];
        paths.push(newPath);
      }
    }
  }

  return finishedPaths.map((p) => p.map((n) => n.name).join(","));
}
