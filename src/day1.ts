
function countIncreases(depths: number[]): number {

    let previousDepth: number | undefined = undefined
    let largerCount = 0
    for (const depth of depths) {
        if (previousDepth) {
            if (depth > previousDepth) {
                largerCount ++
            }
        }
        previousDepth = depth
    }
    return largerCount
}

export async function day1a() {
    const input1a = await Deno.readTextFile('src/data/1a.txt')

    const depths = input1a.trim().split('\n').map((d) => parseInt(d))

    const largerCount = countIncreases(depths)

    console.log(`${largerCount} were larger than before`)
    if (largerCount !== 1583) {
        console.log('ERROR: got the wrong solution')
        Deno.exit(1)
    }

}

export function makeWindows(depths: number[]): number[] {

    // go through all the depths
    const windows: number[] = Array(depths.length).fill(0)
    for (let i = 0; i < depths.length; i++) {
        windows[i-2] += depths[i]
        windows[i-1] += depths[i]
        windows[i] += depths[i]
    }

    console.log("WINDO", windows)
    const validWindows = windows.slice(0, depths.length - 2)
    return validWindows

}



export async function day1b() {
    const input1a = await Deno.readTextFile('src/data/1a.txt')

    const depths = input1a.trim().split('\n').map((d) => parseInt(d))

    const validWindows = makeWindows(depths)
    const biggerWindows = countIncreases(validWindows)

    console.log(`${biggerWindows} were bigger`)

}

// day1a()
// day1b()
