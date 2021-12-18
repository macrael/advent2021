import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { readExpanse, expandOnce, expandX, calculateStats, expandForty } from './day14.ts'

Deno.test('expansion', () => {

    const ins = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`


// `
// CH -> CBH
// HH -> HNH
// CB -> CHB
// NH -> NCH
// HB -> HCB
// HC -> HBC
// HN -> HCN
// NN -> NCN
// BH -> BHH
// NC -> NBC
// NB -> NBB
// BN -> BBN
// BB -> BNB
// BC -> BBC
// CC -> CNC
// CN -> CCN
// `

    const [base, rules] = readExpanse(ins.trim().split('\n'))

    const firstStep = expandOnce(base, rules)

    assertEquals(firstStep, 'NCNBCHB')

    const secondStep = expandOnce(firstStep, rules)

    assertEquals(secondStep, 'NBCCNBBBCBHCB')

    const nn = expandX('NN', rules, 10)
    console.log("20", nn.length)
    const nc = expandX('NC', rules, 10)
    const cb = expandX('CB', rules, 10)

    const piecewise = nn + nc.slice(1) + cb.slice(1)

    const pstats = calculateStats(piecewise)
    assertEquals(pstats, 1588)

    const tenX = expandX(base, rules)
    const stats = calculateStats(tenX)

    assertEquals(stats, 1588)

    // const fortyX = expandX(base, rules, 40)
    // const fortyStats = calculateStats(fortyX)

    // assertEquals(fortyStats, 1588)

})

// Deno.test('expansion clever', () => {

//     const ins = `
// NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C
// `


// // `
// // CH -> CBH
// // HH -> HNH
// // CB -> CHB
// // NH -> NCH
// // HB -> HCB
// // HC -> HBC
// // HN -> HCN
// // NN -> NCN
// // BH -> BHH
// // NC -> NBC
// // NB -> NBB
// // BN -> BBN
// // BB -> BNB
// // BC -> BBC
// // CC -> CNC
// // CN -> CCN
// // `

//     const [base, rules] = readExpanse(ins.trim().split('\n'))

//     const firstStep = expandOnce(base, rules)

//     assertEquals(firstStep, 'NCNBCHB')

//     const secondStep = expandOnce(firstStep, rules)

//     assertEquals(secondStep, 'NBCCNBBBCBHCB')

//     console.log("NUMBERS")
//     const nn = expandX('NN', rules, 20)
//     console.log("20", nn.length)

//     const forty = expandForty(base, rules)
//     console.log('4040', forty)

//     assertEquals(forty, 2188189693529)

// })
