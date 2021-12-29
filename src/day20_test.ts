import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { printImage, padImage, enhanceImage, countPixels } from "./day20.ts"

Deno.test('enhance!', () => {

    const ins = `
..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###
`.trim()

    const [enhancer, imageStr] = ins.split('\n\n')

    const image = padImage(imageStr)

    console.log(printImage(image))

    const enhanceOne = enhanceImage(image, enhancer)

    console.log(printImage(enhanceOne))

    const enhanceTwo = enhanceImage(enhanceOne, enhancer)

    console.log(printImage(enhanceTwo))

    const count = countPixels(enhanceTwo)

    assertEquals(count,35)
})
