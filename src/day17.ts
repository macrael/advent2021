// start 8:15
// all done 9:04. 

interface Target {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
}

export function parseTarget(input: string): Target {
    // "target area: x=20..30, y=-10..-5";

    const regexp = /x=(.*), y=(.*)/
    const match = input.match(regexp)

    if (!match) {
        throw new Error('nope')
    }

    console.log("mAT", match)

    const [minX, maxX] = match[1].split('..').map(Number)
    const [minY, maxY] = match[2].split('..').map(Number)

    return {
        minX,
        maxX,
        minY,
        maxY
    }
}

interface Point {
    x: number,
    y: number
}

function pt(x: number, y: number): Point {
    return {
        x,
        y
    }
}

export function launchProbe(vx: number, vy: number, target: Target): [Point[], boolean] {

    let loc = pt(0,0)
    let vel = pt(vx, vy)
    const trajectory = [loc]

    while (loc.x <= target.maxX && loc.y >= target.minY) {
        loc = pt(loc.x + vel.x, loc.y + vel.y)
        const newVX = vel.x > 0 ? vel.x - 1 : 0
        vel = pt(newVX, vel.y - 1)

        trajectory.push(loc)

        if (loc.x <= target.maxX && loc.x >= target.minX &&
            loc.y <= target.maxY && loc.y >= target.minY) {
            return [trajectory, true]
        }
    }

    return [trajectory, false]
}
