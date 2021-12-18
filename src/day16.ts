// part 1 took an hour and a half probably
// start part 2 8pm
// finish 8:10

interface Packet {
    version: number,
    type: number,
    literal: number,
    subPackets: Packet[],
}

const hex2binary: { [hex: string]: string } = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111",
}

function take(stream: string[], c: number): string {
    const head = stream[0].slice(0, c)
    const tail = stream[0].slice(c)

    stream[0] = tail

    return head
}

function nextPacket(stream: [string]): Packet {
    // read version
    const bvers = take(stream, 3)
    const btype = take(stream, 3)

    const vers = parseInt(bvers, 2)
    const type = parseInt(btype, 2)

    console.log("V", vers, type, stream)

    if (type === 4) {
        // literal value
        let bvalue = ''
        while (true) {
            const bits = take(stream, 5)
            const first = bits[0]
            const last = bits.slice(1)
            bvalue += last
            if (first === '0') {
                break
            }
        }

        const value = parseInt(bvalue, 2)
        return {
            version: vers,
            type,
            literal: value,
            subPackets: [],
        }

    } else {
        // operator of some kind

        const lengthType = take(stream, 1)

        if (lengthType === '0') {
            // next 15 bits is total length of sub packets
            const bsubLength = take(stream, 15)
            const subLength = parseInt(bsubLength, 2)

            // not clear to me yet that this matters, actually. 
            console.log(`looking for ${subLength} bits`)
            const subStream: [string] = [take(stream, subLength)]
            const subPackets = []
            while (subStream[0].length > 0) {
                console.log("LENGHT ", subStream[0].length, subStream[0])
                subPackets.push(nextPacket(subStream))
            }

            return {
                version: vers,
                type,
                literal: -1,
                subPackets,
            }


        } else {
            // next 11 bits are the number of sub packets
            const bsubCount = take(stream, 11)
            const subCount = parseInt(bsubCount, 2)

            console.log(`looking for ${subCount} packets`)
            const subPackets = []
            for (let i = 0; i < subCount; i++) {
                subPackets.push(nextPacket(stream))
            }

            return {
                version: vers,
                type,
                literal: -1,
                subPackets,
            }

        }

    }
}

export function parsePacket(hex: string): Packet {

    let binary = ''
    for (const c of hex.split('')) {
        binary += hex2binary[c]
    }

    console.log("bin", binary)

    const stream: [string] = [binary]

    return nextPacket(stream)

}


export function sumVersions(packet: Packet): number {
    let sum = packet.version

    for (const sub of packet.subPackets) {
        sum += sumVersions(sub)
    }

    return sum

}


export function computePacket(packet: Packet): number {

    switch(packet.type) {
        case(4):{
            return packet.literal
        }
        case (0): {
            //sum
            const subPackets = packet.subPackets.map(computePacket)
            return subPackets.reduce((acc, p) => acc + p, 0)
        }
        case (1): {
            // product
            const subPackets = packet.subPackets.map(computePacket)
            return subPackets.reduce((acc, p) => acc * p, 1)
        }
        case (2): {
            // min
            const subPackets = packet.subPackets.map(computePacket)
            return Math.min(...subPackets)
        }
        case (3): {
            // max
            const subPackets = packet.subPackets.map(computePacket)
            return Math.max(...subPackets)
        }
        case (5): {
            // gt
            const [a, b] = packet.subPackets.map(computePacket)
            return (a > b) ? 1 : 0
        }
        case (6): {
            // lt
            const [a, b] = packet.subPackets.map(computePacket)
            return a < b ? 1 : 0
        }
        case (7): {
            // eq
            const [a, b] = packet.subPackets.map(computePacket)
            return a === b ? 1 : 0
        }
    }
    return -99999
}
