import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseStartingInput, octopusStep, prettyPodes, countFlashes, firstSyncFlash } from './day11.ts'

function testSteps(input: string, expected: string, steps: number) {
    const thirdOctopi = parseStartingInput(input)
    countFlashes(thirdOctopi, steps)
    const three = prettyPodes(thirdOctopi)

    if (three !== expected) {
        console.log("Failed checking step: ", steps)
    }

    assertEquals(three, expected)
}

Deno.test('octopie', () => {

    const ins = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`.trim()

    const octopi = parseStartingInput(ins)

    octopusStep(octopi)
    const one = prettyPodes(octopi)
    const oneExpected = `
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`.trim()
    assertEquals(one, oneExpected)

    const twoExpected = `
8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`.trim()
    testSteps(ins, twoExpected, 2)

    const threeExpected = `
0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000`.trim()
    testSteps(ins, threeExpected, 3)


    const fourExpected = `
2263031977
0923031697
0032221150
0041111163
0076191174
0053411122
0042361120
5532241122
1532247211
1132230211`.trim()
    testSteps(ins, fourExpected, 4)

    const fiveExpected = `
4484144000
2044144000
2253333493
1152333274
1187303285
1164633233
1153472231
6643352233
2643358322
2243341322`.trim()
    testSteps(ins, fiveExpected, 5)

    const tenExpected = `
0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000`.trim()
    testSteps(ins, tenExpected, 10)

// - four lines is the fucked one
//     const twenty2Expected = `
// 3936556452
// 5686556806
// 4496555690
// 4448655580
// 4456865570
// 5680086577
// 7000009896
// 0000000344
// 6000000364
// 4600009543`.trim()
//     testSteps(ins, twenty2Expected, 20)

    const elevenExpected = `
1592224009
1142224340
1263223626
1305322517
1400322417
1307722344
1664472241
6643363461
1643361711
1143351111`.trim()
    testSteps(ins, elevenExpected, 11)

    const twelveExpected = `
2704335120
2364335462
2374334737
2416433628
2511433528
2418833455
2775583352
7754474572
2754472822
2254462222`.trim()
    testSteps(ins, twelveExpected, 12)
// above look real good.

    const thirteenExpected = `
3815446231
3475446573
3485445848
3527544739
3622544639
3529944566
3886694463
8865585683
3865583933
3365573333`.trim()
    testSteps(ins, thirteenExpected, 13)

// our line looks right here. 
    const fourteenExpected = `
4926557342
4586557695
4596556970
4638655870
4745865760
5870086688
7000009895
0000000005
7000000075
5700008654`.trim()
    testSteps(ins, fourteenExpected, 14)

    const fifteenExpected = `
6070000874
6900000008
5800000004
5870000004
5869000005
6982400000
8111240009
1111123437
8111111186
6811119765`.trim()
    testSteps(ins, fifteenExpected, 15)
// again, our line looks good above. 

    const sixteenExpected = `
9391111985
0031111119
0052111115
0004211115
0000211116
0006611122
0643351120
3322234559
9222233397
7922230976`.trim()
    testSteps(ins, sixteenExpected, 16)
// our line looks right

    const seventeenExpected = `
0603223008
2353223450
1163222237
1115322226
1111322227
1117722233
1754462242
5533345790
0643345700
0043342000`.trim()
    testSteps(ins, seventeenExpected, 17)
// our line looks right above

    const eighteenExpected = `
1714334119
3464334561
2274333348
2226433337
2222433338
2228833344
2865573464
6644456902
1754456922
1154453111`.trim()
    testSteps(ins, eighteenExpected, 18)
// our line is right?

    const ninteenExpected = `
2825445230
4575445683
3385444459
3337544448
3333544449
3339944455
3976685685
7755569033
2865569053
2265565332`.trim()
    testSteps(ins, ninteenExpected, 19)

    const twentyExpected = `
3936556452
5686556806
4496555690
4448655580
4456865570
5680086577
7000009896
0000000344
6000000364
4600009543`.trim()
    testSteps(ins, twentyExpected, 20)

    const thirtyExpected = `
0643334118
4253334611
3374333458
2225333337
2229333338
2276733333
2754574565
5544458511
9444447111
7944446119`.trim()
    testSteps(ins, thirtyExpected, 30)

    const fiftyExpected = `
9655556447
4865556805
4486555690
4458655580
4574865570
5700086566
6000009887
8000000533
6800000633
5680000538`.trim()
    testSteps(ins, fiftyExpected, 50)

    const hundreadExpected = `
0397666866
0749766918
0053976933
0004297822
0004229892
0053222877
0532222966
9322228966
7922286866
6789998766`.trim()
    testSteps(ins, hundreadExpected, 100)


    const onehundreadoctos = parseStartingInput(ins)
    const flashes = countFlashes(onehundreadoctos, 100)
    assertEquals(flashes, 1656)

})

Deno.test('number 20', () => {

        const ins = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`.trim()

    const octos = parseStartingInput(ins)

    countFlashes(octos, 19)
    const ninteenExpected = `
2825445230
4575445683
3385444459
3337544448
3333544449
3339944455
3976685685
7755569033
2865569053
2265565332`.trim()

    assertEquals(prettyPodes(octos), ninteenExpected)

    octopusStep(octos)

    const twentyExpected = `
3936556452
5686556806
4496555690
4448655580
4456865570
5680086577
7000009896
0000000344
6000000364
4600009543`.trim()
    assertEquals(prettyPodes(octos), twentyExpected)

})

Deno.test('together', () => {

        const ins = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`.trim()
    
    const octos = parseStartingInput(ins)

    const firstTogether = firstSyncFlash(octos)

    assertEquals(firstTogether, 195)

})
