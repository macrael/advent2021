export function alignCrabs(crabs: number[], idx: number) {
  const fuels = crabs.map((c) => Math.abs(c - idx));
  const sum = fuels.reduce((acc, x) => acc + x, 0);

  return sum;
}

export function alignCrabsAccurately(crabs: number[], idx: number) {
  const fuels = crabs.map((c) => {
    const n = Math.abs(c - idx);
    const sumFromOneToN = n * (n + 1) / 2;
    return sumFromOneToN;
  });
  const sum = fuels.reduce((acc, x) => acc + x, 0);

  return sum;
}

export function cheapestAlignment(crabs: number[]): number {
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);

  let lastFuel = 99999999999;
  for (let i = min; i <= max; i++) {
    const thisFuel = alignCrabs(crabs, i);
    // console.log(`${i}: ${thisFuel}`);
    if (thisFuel > lastFuel) {
      // console.log("returning", lastFuel);
      return lastFuel;
    }
    lastFuel = thisFuel;
  }

  throw new Error("never got it");
}

export function cheapestAccurateAlignment(crabs: number[]): number {
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);

  let lastFuel = 99999999999;
  for (let i = min; i <= max; i++) {
    const thisFuel = alignCrabsAccurately(crabs, i);
    // console.log(`${i}: ${thisFuel}`);
    if (thisFuel > lastFuel) {
      // console.log("returning", lastFuel);
      return lastFuel;
    }
    lastFuel = thisFuel;
  }

  throw new Error("never got it");
}
