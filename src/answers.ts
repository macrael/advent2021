import { readLines } from './lib.ts'
import { parseTape, runMisreadProgram, runAimProgram } from './day2.ts'
import { gammaRate, calculateGE, oxygenRating } from './day3.ts'
import { loadRoom, firstWinner, lastWinner, scoreWinner } from './day4.ts'

async function day2() {
    const inputs = await Deno.readTextFile('src/data/2.txt')
    const lines = inputs.trim().split('\n')

    const p = parseTape(lines)
    const sub = runMisreadProgram(p)

    const sum = sub.depth * sub.horizontal
    console.log('Day 2a: misread', {sub, sum})

    const trueSub = runAimProgram(p)

    const aimSum = trueSub.depth * trueSub.horizontal
    console.log('Day 2b: aimed', { trueSub, aimSum })

}

async function day3() {

    const lines =await readLines('src/data/3.txt')

    const gamma = gammaRate(lines)
    const [g, e] = calculateGE(gamma)
    const power = g * e

    console.log("Day 3a: ", {g, e, power})

    const o2 = oxygenRating(lines)
    const co2 = oxygenRating(lines, true)
    const gen = o2 * co2

    console.log("Day 3b: ", {o2, co2, gen})

}

async function day4() {
    const inputs = await Deno.readTextFile('src/data/4.txt')

    const room = loadRoom(inputs.trim())
    const winner = firstWinner(room)
    const score = scoreWinner(winner)

    console.log("Day 4a: ", { lastNum: winner.lastNumber, score })


    const loseRoom = loadRoom(inputs.trim())
    const loser = lastWinner(loseRoom)
    const loserScore = scoreWinner(loser)

    console.log("Day 4b: ", {lastNum: loser.lastNumber, loserScore})

}

day2()
day3()
day4()
