
export function printImage(image: string[][]): string {

    return image.map(l => l.join('')).join('\n')

}


export function padImage(image: string): string[][] {

    const padding = 60
    const lines = image.split('\n')

    const paddedLength = lines[0].length + padding * 2

    const imageLines = []
    for (let i = 0; i < padding; i ++) {
        const p = Array(paddedLength).fill('.')
        imageLines.push(p)
    }

    for (const line of lines) {
        const pad: string[] = Array(padding).fill('.')
        const paddedLine = pad.concat(line.split('')).concat(pad)
        imageLines.push(paddedLine)
    }

    for (let i = 0; i < padding; i ++) {
        const p = Array(paddedLength).fill('.')
        imageLines.push(p)
    }

    return imageLines
}

export function neighbors(i: number, j: number): [number, number][] {
  const possible: [number, number][] = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],

    [i , j - 1],
    [i , j],
    [i , j + 1],

    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];

  return possible
}

export function enhanceImage(image: string[][], enhancer: string): string[][] {

    const height = image.length
    const width = image[0].length

    const newImage: string[][] = []

    for (let i = 0; i < height; i ++) {
        newImage.push(new Array(width).fill('.'))
    }

    for (let i = 1; i < height - 1; i++) {
        for (let j = 1; j < width - 1; j++) {

            const neighs = neighbors(i, j)

            if (j === 7 && i == 7) {
                for (const n of neighs) {
                    console.log("N", n, image[n[0]][n[1]])
                }
            }

            const bits = neighs.map(pt => {
                const val = image[pt[0]][pt[1]]
                return val === '#' ? '1' : '0'
            }).join('')

            const enhancement = parseInt(bits, 2)

            const enhanced = enhancer[enhancement]

            if (j === 7 && i == 7) {
                console.log('77', bits, enhancement, enhanced)
            }

            newImage[i][j] = enhanced
        }
    }

    return newImage

}

export function flipEdge(image: string[][]) {

    // we're flip flopping zero bits.

    for (const i of [0, image.length - 1]) {
        for (let j = 0; j < image[0].length; j++) {
            image[i][j] = image[i][j] === '.' ? '#' : '.'
        }
    }

    for (let i = 1; i < image.length - 1; i++) {
        for (const j of [0, image[0].length - 1]) {
            image[i][j] = image[i][j] === '.' ? '#' : '.'
        }
    }

}

export function countPixels(image: string[][]): number {

    let count = 0
    for (const line of image) {
        for (const pix of line) {
            if (pix === '#') {
                count ++
            }
        }
    }
    return count
}
