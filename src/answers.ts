import { parseTape, runMisreadProgram, runAimProgram } from './day2.ts'

async function day2() {
    const inputs = await Deno.readTextFile('src/data/2.txt')
    const lines = inputs.trim().split('\n')

    const p = parseTape(lines)
    const sub = runMisreadProgram(p)

    const sum = sub.depth * sub.horizontal
    console.log('misread', {sub, sum})

    const trueSub = runAimProgram(p)

    const aimSum = trueSub.depth * trueSub.horizontal
    console.log('aimed', { trueSub, aimSum })

}

day2()
