// first idea, calculate absolute distances between each beacon.
// maybe then we can create a web of them?

interface Point {
  x: number;
  y: number;
  z: number;
}

type DistanceMatrix = { [point: string]: number };

function matk(a: Point, b: Point): string {
  return [a, b].map(ptk).sort().join("|");
}

function insertDistance(m: DistanceMatrix, a: Point, b: Point, d: number) {
  const k = matk(a, b);
  m[k] = d;
}

export function distancesForPoint(m: DistanceMatrix, p: Point) {
  const k = ptk(p);
  const distKeys = Object.keys(m).filter((mk) => mk.includes(k));
  return distKeys.map((dk) => m[dk]);
}

export function distanceSimilarity(a: number[], b: number[]) {
  let count = 0;
  for (const d of a) {
    if (b.includes(d)) {
      count++;
    }
  }
  return count;
}

function pt(x: number, y: number, z: number): Point {
  return {
    x,
    y,
    z,
  };
}

export function ptk(p: Point): string {
  return [p.x, p.y, p.z].join(",");
}

function ptv(key: string): Point {
  const [x, y, z] = key.split(",").map(Number);
  return pt(x, y, z);
}

export function parseScanners(input: string): Point[][] {
  const scanners = input.split("\n\n");
  return scanners.map((sc) => {
    const lines = sc.split("\n");
    lines.shift();
    return lines.map((line) => {
      const [x, y, z] = line.split(",").map(Number);
      return pt(x, y, z);
    });
  });
}

function distance(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
}

export function calculateDistances(scan: Point[]): DistanceMatrix {
  const distMatrix: DistanceMatrix = {};

  for (let i = 0; i < scan.length - 1; i++) {
    for (let j = i + 1; j < scan.length; j++) {
      // console.log("PAIR: ",i, j,  scan[i], scan[j])
      const a = scan[i];
      const b = scan[j];
      const d = distance(a, b);
      insertDistance(distMatrix, a, b, d);
    }
  }

  return distMatrix;
}

export function matchPoints(sa: Point[], sb: Point[]): [Point, Point][] {
  // console.log("CalcDist")
  const aDists = calculateDistances(sa);
  const bDists = calculateDistances(sb);

  const similarPoints: [Point, Point][] = [];
  for (const a of sa) {
    const ad = distancesForPoint(aDists, a);
    for (const b of sb) {
      const bd = distancesForPoint(bDists, b);

      const similarity = distanceSimilarity(ad, bd);
      if (similarity > 10) {
        similarPoints.push([a, b]);
      }
    }
  }

  // console.log("Calculated Similarity.")

  return similarPoints;
}

function rotatePoint(p: Point, rot: [number, number, number]): Point {
  const pc = [p.x, p.y, p.z];

  const rc = rot.map((r) => {
    const sign = r === Math.abs(r) ? 1 : -1;

    return pc[Math.abs(r) - 1] * sign;
  });

  return {
    x: rc[0],
    y: rc[1],
    z: rc[2],
  };
}

function translatePoint(p: Point, trans: [number, number, number]): Point {
  return pt(p.x - trans[0], p.y - trans[1], p.z - trans[2]);
}

interface Transform {
  rotation: [number, number, number];
  translation: [number, number, number];
}

export function transformPoint(p: Point, trans: Transform) {
  return translatePoint(rotatePoint(p, trans.rotation), trans.translation);
}

export function calculateRotation(similarPoints: [Point, Point][]): Transform {

  for (let i = 1; i < similarPoints.length; i++) {

    const t = calculateBetwenTwo([similarPoints[0], similarPoints[i]])

    if (!(t instanceof Error)) {
      return t
    }

  }

  throw new Error("No Good Points" + similarPoints)

}

function calculateBetwenTwo(similarPoints: [Point, Point][]): Transform | Error {
  // look at two pairs of points

  // diff x diff y diff z

  const a1 = similarPoints[0][0];
  const a2 = similarPoints[1][0];

  const b1 = similarPoints[0][1];
  const b2 = similarPoints[1][1];

  const dxa = a2.x - a1.x;
  const dya = a2.y - a1.y;
  const dza = a2.z - a1.z;

  const dxb = b2.x - b1.x;
  const dyb = b2.y - b1.y;
  const dzb = b2.z - b1.z;

  // console.log("A: ", dxa, dya, dza);
  // console.log("B: ", dxb, dyb, dzb);

  // there should be some fucking clever matrix math to do here.
  // but i don't remember any of that shit

  // let's just use 3 vecs to do the transformation.
  // first x
  const db = [dxb, dyb, dzb];

  const xloc = db.map(Math.abs).indexOf(Math.abs(dxa));
  const yloc = db.map(Math.abs).indexOf(Math.abs(dya));
  const zloc = db.map(Math.abs).indexOf(Math.abs(dza));

  if ((xloc ** 2 + yloc ** 2 + zloc ** 2) !== 5) {
    console.log("FAIL a: ", [dxa, dya, dza], "b: ", [dxb, dyb, dzb]);
    return new Error("Looks like we got some overlapping points...");
  }

  const rotation: [number, number, number] = [
    (xloc + 1) * (dxa === db[xloc] ? 1 : -1),
    (yloc + 1) * (dya === db[yloc] ? 1 : -1),
    (zloc + 1) * (dza === db[zloc] ? 1 : -1),
  ];
  // console.log("ROTA", rotation);

  // next calculate translation
  const b1InCoord = rotatePoint(b1, rotation);

  const translation: [number, number, number] = [
    b1InCoord.x - a1.x,
    b1InCoord.y - a1.y,
    b1InCoord.z - a1.z,
  ];

  // console.log("FIRST", similarPoints[0]);

  // console.log("b1 rotated", b1InCoord);

  // console.log("trans1", translation);

  // console.log("a1,b1", a1, translatePoint(b1InCoord, translation));

  const b2real = translatePoint(rotatePoint(b2, rotation), translation);

  // console.log("SECOND", similarPoints[1]);

  const b2inCoord = rotatePoint(b2, rotation);
  // console.log("b2 rotates", b2inCoord);

  const translation2: [number, number, number] = [
    b2inCoord.x - a2.x,
    b2inCoord.y - a2.y,
    b2inCoord.z - a2.z,
  ];

  // console.log("Trans2", translation2);

  // console.log("a2, b2", a2, b2real);

  return {
    rotation,
    translation,
  };
}

export function discoverAllBeacons(scanners: Point[][]): [Point[], Point[]] {
  // for different pairs of beacons, all reducing down to the zero one

  // we are parsing beacons into zero's coordinate system
  const allBeaconKeys = new Set(scanners[0].map(ptk));

  const scannerLocs: Point[] = [pt(0,0,0)]

  let undiscoveredBeacons = scanners.slice(1);
  while (undiscoveredBeacons.length > 0) {
    console.log("PASS: Total: ", allBeaconKeys.size, " Remaining: ", undiscoveredBeacons.length)
    // go through one at a time, adding things to our set.
    const newlyDiscoverd: Point[][] = []
    for (const scanner of undiscoveredBeacons) {
      const allBeacons: Point[] = [];
      allBeaconKeys.forEach((bk) => {
        allBeacons.push(ptv(bk));
      });

      const simPts = matchPoints(allBeacons, scanner);

      if (simPts.length < 12) {
        console.log("only found few similar points", simPts.length);
        continue;
      }

      console.log("There were MATCHES", simPts.length)

      // we got enough similar points
      const transform = calculateRotation(simPts);

      const scannerLoc = {
        x: - transform.translation[0],
        y: - transform.translation[1],
        z: - transform.translation[2],
      }
      console.log("Scanner found at", scannerLoc)
      // save the scanner location
      scannerLocs.push(scannerLoc)

      const scannedReal = scanner.map((p) => transformPoint(p, transform));

      scannedReal.forEach((pt) => {
        allBeaconKeys.add(ptk(pt));
      });

      newlyDiscoverd.push(scanner)
      break
    }

    // did a pass, time to modify the undiscovered
    undiscoveredBeacons = undiscoveredBeacons.filter(b => !newlyDiscoverd.includes(b))
  }

  const allPoints: Point[] = []

  allBeaconKeys.forEach(b => {
    allPoints.push(ptv(b))
  })

  return [allPoints, scannerLocs]

}

export function maxManhattenDist(scanners: Point[]) {

  let max = 0

  for (let i = 0; i < scanners.length - 1; i++) {
    for (let j = i; j < scanners.length; j ++) {
      const a = scanners[i]
      const b = scanners[j]

      const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) 

      max = Math.max(max, dist)
    }
  }

  return max

}
