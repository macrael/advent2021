
interface Universe {
    one: number,
    two: number,
    scoreOne: number,
    scoreTwo: number,
    turn: 'ONE' | 'TWO',
}

export function* loadedDie() {
    let roll = 1
    while (true) {
        yield modMax(roll, 100)
        roll ++
    }
    return -1
}

function modMax(num: number, mod: number) {
    const modulated = num % mod
    if (modulated === 0) {
        return mod
    }
    return modulated
}

export function playGame(init1: number, init2: number, dice: Generator<number, number>): number {

    let one = init1
    let two = init2

    let scoreOne = 0
    let scoreTwo = 0

    let count = 0
    while (scoreOne < 1000 && scoreTwo < 1000) {

        const rolls = [dice.next().value, dice.next().value, dice.next().value]
        count += rolls.length

        one += rolls.reduce((acc, r) => acc + r, 0)

        scoreOne += modMax(one, 10)
        console.log("1: ", rolls, modMax(one, 10), scoreOne)


        if (scoreOne >= 1000) {
            break
        }

        const rolls2 = [dice.next().value, dice.next().value, dice.next().value]
        count += rolls2.length

        two += rolls2.reduce((acc, r) => acc + r, 0)

        scoreTwo += modMax(two, 10)
        console.log("2: ", rolls2, modMax(two, 10), scoreTwo)

    }

    console.log("Final", scoreOne, scoreTwo, count)
    const loser = Math.min(scoreOne, scoreTwo)

    return loser * count

}

export function playQuantumGame(initOne: number, initTwo: number): [number, number] {

    const universes = [{
        one: initOne,
        two: initTwo,
        scoreOne: 0,
        scoreTwo: 0,
        turn: 'ONE'
    }]

    let ones = 0
    let twos = 0

    let loop = 0
    while(universes.length > 0) {
        loop ++
        if (loop % 1000000 === 0) {
            console.log("loop", loop, universes.length, ones, twos  )
        }

        const thisUniverse = universes.pop()
        if (thisUniverse === undefined) {
            throw new Error("i think not.")
        }


        if (thisUniverse.scoreOne >= 21 || thisUniverse.scoreTwo >= 21) {
            if (thisUniverse.scoreOne >= 21) {
                ones ++
            } else {
                twos ++
            }
            continue
        }

        const newUniverses = ["111", "112", "113", "121", "122", "123", "131", "132", "133",
            "211", "212", "213", "221", "222", "223", "231", "232", "233",
            "311", "312", "313", "321", "322", "323", "331", "332", "333"].reverse().map((dice) => {
                const nums = dice.split('').map(Number)
                const sum = nums.reduce((acc, n) => acc + n, 0)

                let newOne = thisUniverse.one
                let newTwo = thisUniverse.two

                let newScoreOne = thisUniverse.scoreOne
                let newScoreTwo = thisUniverse.scoreTwo

                let newTurn = 'ONE'

                if (thisUniverse.turn === 'ONE') {
                    newOne += sum
                    newScoreOne += modMax(newOne, 10)
                    newTurn = 'TWO'
                    // console.log("1", nums, sum, newOne, thisUniverse.scoreOne, newScoreOne)
                } else {
                    newTwo += sum
                    newScoreTwo += modMax(newTwo, 10)
                    // console.log("2", nums, sum, newTwo, thisUniverse.scoreTwo, newScoreTwo)
                }

                return {
                    one: newOne,
                    two: newTwo,
                    scoreOne: newScoreOne,
                    scoreTwo: newScoreTwo,
                    turn: newTurn,
                }
            })

            for (const newu of newUniverses) {
                universes.push(newu)
            }
     }

     return [ones, twos]
}

function unikey(u: Universe): string {
    return [u.one, u.two, u.scoreOne, u.scoreTwo, u.turn].join(',')
}

function undokey(k: string): Universe {
    const args = k.split(',')

    const turn: Universe["turn"] = args[4] === 'ONE' ? 'ONE' : 'TWO'

    return {
        one: Number(args[0]),
        two: Number(args[1]),
        scoreOne: Number(args[2]),
        scoreTwo: Number(args[3]),
        turn,
    }
}

function addOne(counter: Map<string, number>, key: string) {
    addN(counter, key, 1)
}

function addN(counter: Map<string, number>, key: string, count: number) {
    const currentValue = counter.get(key) ?? 0
    counter.set(key, currentValue + count)
}

export function playQuantumGameCached(initOne: number, initTwo: number): [number, number] {

    // I need a set of universes, with counts
    // every time we consider a universe, we change it, 
    // the count multiplies to _all_ the other keys.
    // let's use the key in the set if we can as the thing. 
    // the old key disappears, even if it one day will be replaced. 
    // i bet one order will be better than the other?

    const initialUniverse: Universe = {
        one: initOne,
        two: initTwo,
        scoreOne: 0,
        scoreTwo: 0,
        turn: 'ONE'
    }

    const universalCounter = new Map<string, number>()
    addOne(universalCounter, unikey(initialUniverse))

    let ones = 0
    let twos = 0

    let loop = 0
    while(universalCounter.size> 0) {

        loop ++
        if (loop % 1000 === 0) {
            // console.log("WHAT", universes)
            console.log("loop", loop, universalCounter.size, ones, twos  )
            // throw new Error('foobar')
        }

        const thisUniverseKey = universalCounter.keys().next().value
        const thisUniverse = undokey(thisUniverseKey)
        const thisUniverseCount = universalCounter.get(thisUniverseKey)
        universalCounter.delete(thisUniverseKey)

        if (thisUniverseCount === undefined) 
            throw new Error('not likely.')

        // if the game is over, remove it from the set. 
        if (thisUniverse.scoreOne >= 21 || thisUniverse.scoreTwo >= 21) {
            if (thisUniverse.scoreOne >= 21) {
                ones += thisUniverseCount
            } else {
                twos += thisUniverseCount
            }
            continue
        }

        const newUniverses = ["111", "112", "113", "121", "122", "123", "131", "132", "133",
            "211", "212", "213", "221", "222", "223", "231", "232", "233",
            "311", "312", "313", "321", "322", "323", "331", "332", "333"].reverse().map((dice) => {
                const nums = dice.split('').map(Number)
                const sum = nums.reduce((acc, n) => acc + n, 0)

                let newOne = thisUniverse.one
                let newTwo = thisUniverse.two

                let newScoreOne = thisUniverse.scoreOne
                let newScoreTwo = thisUniverse.scoreTwo

                let newTurn: 'ONE' | 'TWO' = 'ONE'

                if (thisUniverse.turn === 'ONE') {
                    newOne = modMax(newOne + sum, 10)
                    newScoreOne += newOne
                    newTurn = 'TWO'
                    // console.log("1", nums, sum, newOne, thisUniverse.scoreOne, newScoreOne)
                } else {
                    newTwo = modMax(newTwo + sum, 10)
                    newScoreTwo += newTwo
                    // console.log("2", nums, sum, newTwo, thisUniverse.scoreTwo, newScoreTwo)
                }

                return {
                    one: newOne,
                    two: newTwo,
                    scoreOne: newScoreOne,
                    scoreTwo: newScoreTwo,
                    turn: newTurn,
                }
            })

            for (const newu of newUniverses) {
                addN(universalCounter, unikey(newu), thisUniverseCount)
            }
     }

     return [ones, twos]
}
