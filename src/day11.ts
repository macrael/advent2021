// finish part 1 at 11pm, at least 1:30 on the clock. 
// finish part 2 at 11:05pm

export function parseStartingInput(ins: string): number[][] {
    return ins.split('\n').map(line => line.split('').map(Number))
}

function adjacents(i: number, j: number): [number, number][] {

    const all: [number, number][] = [
        [i - 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i, j - 1],
        [i - 1, j - 1],
    ]

    const valid = all.filter(([i, j]) => {
        return i > -1 && i < 10 && j > -1 && j < 10
    } )

    return valid
}

function zapOctopus(octopi: number[][], i: number, j: number) {
    const freshOcto = octopi[i][j]
    if (freshOcto === -1) {
        return
    }
    octopi[i][j] = octopi[i][j] + 1
    const octo = octopi[i][j]
    if (octo > 9) {
        octopi[i][j] = -1
        for (const [ia, ja] of adjacents(i, j)) {
            const zapee = octopi[ia][ja]
            if (zapee !== -1) {
                zapOctopus(octopi, ia, ja)
            }
        }
    }
}

export function prettyPodes(octopi: number[][]): string {
    return octopi.map(row => {
        return row.join('')
    }).join('\n')
}

export function octopusStep(octopi: number[][]) {

    // 1
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[0].length; j ++) {
            octopi[i][j] = octopi[i][j] + 1
        }
    }

    // 2
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[0].length; j ++) {
            const octo = octopi[i][j]

            if (octo > 9) {
                octopi[i][j] = -1
                for (const [ia, ja] of adjacents(i, j)) {
                    zapOctopus(octopi, ia, ja)
                }
            }
        }
    }

    // 3
    let flashCount = 0
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[0].length; j ++) {
            if (octopi[i][j] === -1) {
                octopi[i][j] = 0
                flashCount ++;
            }
        }
    }

    return flashCount
}

export function countFlashes(octopi: number[][], steps: number): number {
    let flashCount = 0
    for (let i = 1; i <= steps; i ++) {
        flashCount += octopusStep(octopi)
    }
    return flashCount
}

export function firstSyncFlash(octopi: number[][]): number {

    for (let i = 1; i < 100_000; i++) {
        const flashes = octopusStep(octopi)
        if (flashes === 100) {
            return i
        }
    }

    return -1
}
