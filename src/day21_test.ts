import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { loadedDie, playGame, playQuantumGame } from "./day21.ts"

Deno.test('loaded dice', () => {

    const result = playGame(4, 8, loadedDie())

    assertEquals(result, 739785)


})

Deno.test('freaky dice', () => {

    const result = playQuantumGame(4, 8)

    console.log("GOTEM", result)

    assertEquals(result[0], 739785)

    
})
