
export function gammaRate(diagnostics: string[]): string {

    const counts = Array(diagnostics[0].length).fill(0)

    for (const diag of diagnostics) {
        const digits = diag.split('')
        for (let i = 0; i < digits.length; i++) {
            counts[i] += Number(digits[i])
        }
    }

    const gamma = counts.map((c) => {
        return (c >= (diagnostics.length / 2) ? '1' : '0')
    })

    return gamma.join('')
}

export function calculateGE(gamma: string): [number, number] {

    const bin = parseInt(gamma, 2)
    const mask = (2 ** gamma.length) - 1

    const inverted = ~bin & mask

    return [bin, inverted]
}

export function oxygenRating(diags: string[], invert: boolean = false): number {

    let idx = 0
    let o2s = diags
    while (o2s.length > 1) {

        const gamma = gammaRate(o2s)
        const maxbit = gamma[idx]

        o2s = o2s.filter((o) => 
            (o[idx] === maxbit) != invert
        )
        idx ++

    }

    const rating = o2s[0]
    return parseInt(rating, 2)

}
