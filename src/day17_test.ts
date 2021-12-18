import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseTarget, launchProbe } from "./day17.ts"

Deno.test("shoot it", () => {
  const ins = "target area: x=20..30, y=-10..-5";

  const t = parseTarget(ins)
  console.log(t)

  const [traj, succ] = launchProbe(7, 2, t)
  console.log('traj', traj)

  assertEquals(succ, true);
});

Deno.test("miss", () => {
  const ins = "target area: x=20..30, y=-10..-5";

  const t = parseTarget(ins)
  console.log(t)

  const [traj, succ] = launchProbe(17,-4, t)
  console.log('traj', traj)

  assertEquals(succ, false);
});

Deno.test("shoot it", () => {
  const ins = "target area: x=20..30, y=-10..-5";

  const t = parseTarget(ins)
  console.log(t)

  const [traj, succ] = launchProbe(6, 9, t)
  console.log('traj', traj)

  const maxY = traj.reduce((acc, pt) => Math.max(acc, pt.y), Number.MIN_VALUE)

  assertEquals(succ, true);
  assertEquals(maxY, 45);
});

Deno.test("find count", () => {
  const ins = "target area: x=20..30, y=-10..-5";

  const t = parseTarget(ins)
  console.log(t)

  const valids = []
  for (let vy = -100; vy < 100; vy++) {
    let line = ""
    for (let vx = 1; vx < 100; vx ++) {
      const [traj, succ] = launchProbe(vx, vy, t)
      if (!succ) {
        line += "    "
      } else {
        valids.push([vx, vy])
        const maxY = traj.reduce((acc, pt) => Math.max(acc, pt.y), Number.MIN_VALUE)
        line += ` ${maxY.toString().padStart(2)} `
      }
    }
    // console.log(line)
  }

  assertEquals(valids.length, 112)
});

Deno.test("find true max", () => {
  const ins = "target area: x=150..171, y=-129..-70";

  const t = parseTarget(ins)
  // console.log(t)

  const valids = []
  for (let vy = -1000; vy < 1000; vy++) {
    let line = ""
    for (let vx = 1; vx < 1000; vx ++) {
      const [traj, succ] = launchProbe(vx, vy, t)
      if (!succ) {
        line += "    "
      } else {
        valids.push([vx, vy])
        const maxY = traj.reduce((acc, pt) => Math.max(acc, pt.y), Number.MIN_VALUE)
        line += ` ${maxY.toString().padStart(2)} `
      }
    }
    // console.log(line)2326
  }

  assertEquals(valids.length, 2326)
  assertEquals(8256, 8256)
});
