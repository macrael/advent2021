// start 9:10
// part 2 much much quicker.
// finish 11;46

// it's a tree. each node has left/right
// add puts a new root node

// determine depth for "nested in 4"
// how do you find the left/right most?

interface Node {
  left: Node | [number];
  right: Node | [number];
}

function nodeOrNumber(snail: string): Node | [number] {
  if (snail[0] === "[") {
    return readSnailNumber(snail);
  }

  return [Number(snail)];
}

export function readSnailNumber(snail: string): Node {
  // read left to right. the first comma after no matched parens is our split.

  let parens = 0;
  for (let i = 1; i < snail.length; i++) {
    const char = snail.charAt(i);
    if (char === "[") {
      parens++;
    } else if (char === "]") {
      parens--;
    } else if (parens === 0 && char === ",") {
      const leftSnail = snail.slice(1, i);
      const rightSnail = snail.slice(i + 1, snail.length - 1);

      const left = nodeOrNumber(leftSnail);
      const right = nodeOrNumber(rightSnail);

      return { left, right };
    }
  }

  throw new Error("NOPE");
}

export function writeSnailNumber(n: Node | [number]): string {
  if (Array.isArray(n)) {
    return n[0].toString();
  }

  const left = writeSnailNumber(n.left);
  const right = writeSnailNumber(n.right);

  return `[${left},${right}]`;
}

export function reduceSnail(root: Node): Node {
  // first explode
  // look for the first bare pair four levels deep
  // add to the last number seen and the next number seen.

  while (true) {
    console.log("REDUCE", writeSnailNumber(root))
    let depth = 0;
    let lastLeaf: [number] | undefined = undefined;
    let explodeRight: number | undefined = undefined;
    let mode: "TO_EXPLODE" | "EXPLODING" | "EXPLODED" = "TO_EXPLODE";
    let parent = root;
    let toSplitLeft: Node | undefined = false
      ? { left: [3], right: [3] }
      : undefined;
    let toSplitRight: Node | undefined = false
      ? { left: [3], right: [3] }
      : undefined;
    const traverse = (n: Node) => {
      if (mode === "EXPLODED") {
        return;
      }
      // explode
      if (depth === 4 && mode === "TO_EXPLODE") {
        console.log("EXPLODE", n.left, n.right);
        mode = "EXPLODING";
        if (!Array.isArray(n.left) || !Array.isArray(n.right)) {
          throw new Error("this is not supposed to happen");
        }
        if (lastLeaf) {
          lastLeaf[0] = lastLeaf[0] + n.left[0];
        }
        explodeRight = n.right[0];

        if (parent.left === n) {
          parent.left = [0];
        } else {
          parent.right = [0];
        }
      } else {
        // traverse
        if (Array.isArray(n.left)) {
          //split
          if (!toSplitLeft && !toSplitRight && n.left[0] > 9) {
            toSplitLeft = n;
          }
          //end split

          if (mode === "EXPLODING") {
            if (explodeRight === undefined) {
              throw new Error("we gotta be exploding");
            }
            n.left[0] = n.left[0] + explodeRight;
            mode = "EXPLODED";
          }
          lastLeaf = n.left;
        } else {
          depth++;
          parent = n;
          traverse(n.left);
          depth--;
        }
        if (Array.isArray(n.right)) {
          //split
          if (!toSplitLeft && !toSplitRight && n.right[0] > 9) {
            toSplitRight = n;
          }
          //end split

          if (mode === "EXPLODING") {
            if (explodeRight === undefined) {
              throw new Error("we gotta be exploding");
            }
            n.right[0] = n.right[0] + explodeRight;
            mode = "EXPLODED";
          }
          lastLeaf = n.right;
        } else {
          depth++;
          parent = n;
          traverse(n.right);
          depth--;
        }
      }
    };

    traverse(root);

    if (mode === "TO_EXPLODE" && !toSplitLeft && !toSplitRight) {
      // we didn't make any modifications this time
      return root;
    }

    // if we didn't explode, lets split.
    if (mode === "TO_EXPLODE" && toSplitLeft !== undefined) {
      if (!Array.isArray(toSplitLeft.left)) {
        throw new Error("bad logic");
      }

      const c = toSplitLeft.left[0];
      const left = Math.floor(c / 2);
      const right = Math.ceil(c / 2);

      toSplitLeft.left = { left: [left], right: [right] };
    } else if (mode === "TO_EXPLODE" && toSplitRight !== undefined) {
      if (!Array.isArray(toSplitRight.right)) {
        throw new Error("bad logic");
      }

      const c = toSplitRight.right[0];
      const left = Math.floor(c / 2);
      const right = Math.ceil(c / 2);

      toSplitRight.right = { left: [left], right: [right] };
    }
  }
}

export function addSnails(a: Node, b: Node): Node {
  const sum = {left: a, right: b}

  reduceSnail(sum)

  return sum
}

export function magnitude(n: Node | [number]): number {

  if (Array.isArray(n)) {
    return n[0]
  }

  const left = magnitude(n.left)
  const right = magnitude(n.right)

  return 3 * left + 2 * right

}

export function maxMag(snails: string[]): number {

  let max = -1
  let maxes: Node[] = []

  for (let i =0; i < snails.length; i ++) {
    for (let j = 0; j < snails.length; j++) {
      if (i == j) {
        continue
      }

      const a = readSnailNumber(snails[i])
      const b = readSnailNumber(snails[j])

      const sum = addSnails(a,b)
      const mag = magnitude(sum)

      max = Math.max(max, mag)
      if (mag === max) {
        maxes = [a,b]
      }

    }
  }

  console.log("MAES", maxes.map(writeSnailNumber))
 
  return max
}
