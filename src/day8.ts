import { EArray } from "https://deno.land/x/earray@1.0.0/mod.ts";

type MysteryWiring = {
  inputs: string[];
  outputs: string[];
};

export function readWiring(inputs: string[]): MysteryWiring[] {
  return inputs.map((wire) => {
    const wiring: MysteryWiring = {
      inputs: [],
      outputs: [],
    };

    const inAndOut = wire.split(" | ");
    wiring.inputs = inAndOut[0].split(" ").map((num) => {
      return num.split("").sort().join("");
    });

    wiring.outputs = inAndOut[1].split(" ").map((num) => {
      return num.split("").sort().join("");
    });

    return wiring;
  });
}

export function countEasyOnes(wiring: MysteryWiring[]): number {
  let easies = 0;
  for (const wire of wiring) {
    easies += wire.outputs.filter((w) =>
      [2, 4, 3, 7].includes(w.length)
    ).length;
  }

  return easies;
}

/*
  ab: 1 (2)
  bad: 7 (3)
  eafb: 4 (4)
  acedgfb: 8 (7)

  cdfbe: 5 (5)  ---- 5, "EF (4)"
  gcdfa: 2 (5) ---- 5, NOT AB, NOT EF
  fbcad: 3 (5) "ab(1)" ---- 5, AB

  cefabd: 9 (6) "ab(1)" "ef(4)" ----- 6, AB, EF
  cdfgeb: 6 (6) "ef (4)" ---- 6, NOT AB
  cagedb: 0 (6) "ab(1)", ----- 6, AB, NOT EF
  */

const easyOnes: { [num: number]: number } = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
}; 

export function logicAll(ten: string[]): { [num: number]: string } {
  const key: { [num: number]: string } = {};

  // first get the easy ones
  for (let i = 0; i < ten.length; i++) {
    const one = ten[i];
    const len = one.length;
    if (len in easyOnes) {
      key[easyOnes[len]] = one;
      ten.splice(i, 1);
      i--;
    }
  }

  const ab = key[1].split('')
  const ef = key[4].split('').filter(l => !ab.includes(l))

  for (const one of ten) {
    const eOne = EArray(one.split(''))
    if (one.length === 5) {
      if (eOne.contain(...ab)) {
        key[3] = one
      } else if (eOne.contain(...ef)) {
        key[5] = one
      } else {
        key[2] = one
      }
    } else {
      if (!eOne.contain(...ab)) {
        key[6] = one
      } else if (eOne.contain(...ef)) {
        key[9] = one
      } else {
        key[0] = one
      }
    }
  }

  return key;
}

export function readDigit(key: { [num: number]: string }, digit: string): number {

  const invKey:  { [dig: string]: number } = {}
  for (const k in Object.keys(key)) {
    const ik = Number(k)
    invKey[key[ik]] = ik
  }

  const sortedDigit = digit.split('').sort().join('')

  for (const [d, n] of Object.entries(invKey)) {
    const sortedKey = d.split('').sort().join('')
    if (sortedDigit === sortedKey) {
      return n
    }
  }

  throw new Error('nope')
}

export function solveMystery(mystery: MysteryWiring): number {
  const key = logicAll(mystery.inputs)
  return  Number(mystery.outputs.map(d => readDigit(key, d)).join(''))
}

