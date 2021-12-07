type Instruction = "FORWARD" | "DOWN" | "UP";

type Command = [Instruction, number];

export type Program = Command[];

type Sub = {
  horizontal: number;
  depth: number;
  aim: number;
};

const translation: { [i: string]: Instruction } = {
  "forward": "FORWARD",
  "down": "DOWN",
  "up": "UP",
};

export function parseTape(tape: string[]): Program {
  const program: Program = [];
  for (const line of tape) {
    const bits = line.split(" ");

    const inst = translation[bits[0]];
    const val = parseInt(bits[1]);

    const cmd: Command = [inst, val];
    program.push(cmd);
  }
  return program;
}

export function runMisreadProgram(p: Program): Sub {
  const sub = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  for (const cmd of p) {
    const val = cmd[1];
    switch (cmd[0]) {
      case "FORWARD":
        sub.horizontal += val;
        break;
      case "DOWN":
        sub.depth += val;
        break;
      case "UP":
        sub.depth -= val;
        break;
    }
  }

  return sub;
}

export function runAimProgram(p: Program): Sub {
  const sub = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  for (const cmd of p) {
    const val = cmd[1];
    switch (cmd[0]) {
      case "FORWARD":
        sub.horizontal += val;
        sub.depth += sub.aim * val;
        break;
      case "DOWN":
        sub.aim += val;
        break;
      case "UP":
        sub.aim -= val;
        break;
    }
  }

  return sub;
}
