// start 9:10

// it's a tree. each node has left/right
// add puts a new root node

// determine depth for "nested in 4"
// how do you find the left/right most?

interface Node {
  left: Node | number;
  right: Node | number;
}

function nodeOrNumber(snail: string): Node | number {

  if (snail[0] === '[') {
    return readSnailNumber(snail)
  }

  return Number(snail)

}

export function readSnailNumber(snail: string): Node {

  // read left to right. the first comma after no matched parens is our split.

  let parens = 0
  for (let i = 1; i < snail.length; i++) {
    const char = snail.charAt(i)
    if (char === '[') {
      parens ++;
    } else if (char === ']') {
      parens --;
    } else if (parens === 0 && char === ','){
      const leftSnail = snail.slice(1,i)
      const rightSnail = snail.slice(i + 1, snail.length - 1)

      const left = nodeOrNumber(leftSnail)
      const right = nodeOrNumber(rightSnail)

      return {left, right}

    }
  }

  throw new Error("NOPE")
}

export function writeSnailNumber(n: Node | number): string {

  if (typeof n === 'number') {
    return n.toString()
  }

  const left = writeSnailNumber(n.left)
  const right = writeSnailNumber(n.right)

  return `[${left},${right}]`
}

export function reduceSnail(n: Node): Node {

  // first explode
  // look for the first bare pair four levels deep 
  // add to the last number seen and the next number seen. 

  

  // then split
  // look for the left most number that is >= 10 

}
