import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseTape, runMisreadProgram, Program, runAimProgram } from "./day2.ts"

Deno.test('parsing', () => {

    const ins = [
        'forward 5',
        'down 5',
        'forward 8',
        'up 3',
    ]

    const p = parseTape(ins)

    assertEquals([
        ['FORWARD', 5],
        ['DOWN', 5],
        ['FORWARD', 8],
        ['UP', 3],
    ], p)
})

Deno.test('running broken', () => {
    
    const p: Program = [
        ['FORWARD', 5],
        ['DOWN', 5],
        ['FORWARD', 8],
        ['UP', 3],
        ['DOWN', 8],
        ['FORWARD', 2],
    ]

    const sub = runMisreadProgram(p)

    assertEquals(sub, {
        horizontal: 15,
        depth: 10,
        aim: 0,
    })

})

Deno.test('running right', () => {
    
    const p: Program = [
        ['FORWARD', 5],
        ['DOWN', 5],
        ['FORWARD', 8],
        ['UP', 3],
        ['DOWN', 8],
        ['FORWARD', 2],
    ]

    const sub = runAimProgram(p)

    assertEquals(sub, {
        horizontal: 15,
        depth: 60,
        aim: 10,
    })

})
