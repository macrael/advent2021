import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseMap, neighbors, localMinima, basin, localMinimaPts } from './day9.ts'
import { sum } from './lib.ts'

Deno.test('local min', () => {
    const ins = `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim()
    
    const map = parseMap(ins)

    assertEquals([3, 8, 8, 1], neighbors(map, 1, 1))

    assertEquals([9, 8, 4], neighbors(map, 4, 0))

    const mins = localMinima(map)
    assertEquals([1, 0, 5, 5], mins)

    assertEquals(sum(mins.map(m => m + 1)), 15)

    assertEquals(basin(map, 1, 0), [1, 2, 3])
    assertEquals(basin(map, 9, 0), [0, 1, 1, 2, 2, 2, 3, 4, 4])

    const minpts = localMinimaPts(map)
    console.log('pts', minpts)

    const basins = minpts.map(min => basin(map, min[0], min[1]))
    console.log('basins', basins)

    const sizes = basins.map(b => b.length)
    console.log('sizeds', sizes)

    const topThree = sizes.sort((a, b) => b - a).splice(0,3)
    console.log('sizeds', topThree)

    const mult = topThree.reduce((acc, l) => acc * l, 1)

    assertEquals(mult, 1134)



})
