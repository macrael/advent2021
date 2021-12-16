// took an hour and a half end to end.

export type InsertionRules = {[from: string]: string}

export function readExpanse(lines: string[]): [string, InsertionRules] {
    const base = lines.shift()

    if (base === undefined) {
        throw new Error("bad input")
    }
    lines.shift()

    const rules: InsertionRules = {}
    for (const cmd of lines) {
        const [from, to] = cmd.split(' -> ')
        rules[from] = to
    }

    return [base, rules]
}

export function expandOnce(base: string, rules: InsertionRules): string {
    // console.log("Base", base)

    let next = ''
    for (let i = 0; i < base.length - 1; i ++) {
        const pair = base.slice(i, i + 2)
        // console.log("pair", pair)
        next += pair[0]
        if (pair in rules) {
            next += rules[pair]
        }
    }
    next += base[base.length - 1]

    return next
}

export function expandX(base: string, rules: InsertionRules, n = 10): string {

    let next = base
    for (let i = 0; i < n; i++) {
        next = expandOnce(next, rules)
        const counter = countLetters(next)
        console.log('count ', i, next.length, counter)
    }

    return next
}

export function expandForty(base: string, rules: InsertionRules): number {

    // first go through all the pairs in rules and create a pair -> counts after 20 dict
    const allPairs: { [pair: string]: countDict} = {}
    for (const pair of Object.keys(rules)) {
        const after20 = expandX(pair, rules, 20)
        const pairCounts = countLetters(after20)

        // we take the last one off, b/c that'll be in the first of the next one
        pairCounts[pair[1]] = pairCounts[pair[1]] - 1
        allPairs[pair] = pairCounts
    }

    // then count to 20, and go through all a million pairs and sum their dicts together
    const baseX20 = expandX(base, rules, 20)
    const allCounts: countDict = {}
    for (let i = 0; i < baseX20.length - 1; i ++) {
        const pair = baseX20.slice(i, i + 2)
        addCounts(allCounts, allPairs[pair])
    }

    // add on the last character since it wasn't included.
    allCounts[base[base.length - 1]] = allCounts[base[base.length - 1]] + 1

    // the get stats from the overall count dict.
    let min: [string, number] = ['', Number.MAX_VALUE]
    let max: [string, number] = ['', -1]
    for (const letter of Object.keys(allCounts)) {
        const count = allCounts[letter]
        if (count < min[1]) {
            min = [letter, count]
        }
        if (count > max[1]) {
            max = [letter, count]
        }
    }
    console.log("MAX MIN", max, min)

    return max[1] - min[1]

}

type countDict = {[letter: string]: number}

// adds the counts in b to a
function addCounts(a: countDict, b: countDict) {
    for (const key of Object.keys(b)) {
        if (!(key in a)) {
            a[key] = b[key]
        } else {
            a[key] = a[key] + b[key]
        }
    }
}

export function countLetters(base: string): countDict {
        const counter: {[letter: string]: number} = {}

    for (let i = 0; i < base.length; i++) {
        const letter = base[i]
        if (!(letter in counter)) {
            counter[letter] = 0
        }
        counter[letter] = counter[letter] + 1
    }

    return counter
}

export function calculateStats(base: string): number {

    const counter = countLetters(base)

    let min: [string, number] = ['', 9999999999]
    let max: [string, number] = ['', -1]
    for (const letter of Object.keys(counter)) {
        const count = counter[letter]
        if (count < min[1]) {
            min = [letter, count]
        }
        if (count > max[1]) {
            max = [letter, count]
        }
    }
    console.log("MAX MIN", max, min)

    return max[1] - min[1]
}
