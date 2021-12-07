type FishCounter = number[]

export function initialCount(fish: number[]): FishCounter {

    const counter = new Array(9).fill(0)
    for (const f of fish) {
        counter[f] += 1
    }

    return counter
}

export function tickCounter(counter: FishCounter): FishCounter {

    const newCounter = [...counter]

    const newBorns = newCounter.shift()

    if (newBorns === undefined) {
        throw new Error('not possible my droogs')
    }

    newCounter.push(newBorns)
    newCounter[6] += newBorns

    return newCounter
}

export function tickTockCounter(fish: number[], tocks: number): FishCounter {

    let counter = initialCount(fish)

    for (let i =0; i < tocks; i++) {
        counter = tickCounter(counter)
    }

    return counter
}

export function sumCounts(counter: FishCounter) {
    return counter.reduce((acc, x) => acc + x, 0)
}

export function fishTick(fish: number[]): number[] {

    const nextFish = []

    for (const f of fish) {
        if (f === 0) {
            nextFish.push(6)
            nextFish.push(8)
        } else {
            nextFish.push(f - 1)
        }
    }

    return nextFish
}

export function fishTickTock(fish: number[], tocks: number): number [] {
    let ticks = fish
    for (let i =0; i < tocks; i++) {
        ticks = fishTick(ticks)
    }

    return ticks
}
