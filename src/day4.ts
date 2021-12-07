
type BingoRow = [number, boolean][]
type BingoBoard = BingoRow[]
type BingoRoom = {
    numbers: number[],
    boards: BingoBoard[],
}

export function loadBoard(boardInput: string): BingoBoard {
    const board: BingoBoard = []
    for (const row of boardInput.split('\n')) {
        const bRow: BingoRow = []
        for (const num of row.trim().split(/\s+/)) {
            bRow.push([Number(num), false])
        }
        board.push(bRow)
    }

    return board
}

export function playNumber(board: BingoBoard, playedNum: number): void {

    for (const row of board) {
        for (const cell of row) {
            const num = cell[0]

            if (num === playedNum) {
                cell[1] = true
            }
        }
    }
}

export function checkBoard(board: BingoBoard): number[] | undefined {

    // check horizontal
    for (const row of board) {
        if (row.every(cell => cell[1])) {
            return row.map(cell => cell[0])
        }
    }

    const columnCount = board[0].length
    for (let i = 0; i < columnCount; i++) {
        const column = board.map(row => row[i])
        if (column.every(cell => cell[1])) {
            return column.map(cell => cell[0])
        }
    }

    return undefined
}

export function loadRoom(input: string): BingoRoom {

    const splits = input.split(/\n\n/)

    const callingNumbers = splits[0].split(',').map(Number)
    const boards: BingoBoard[] = []

    for (let i = 1; i < splits.length; i++) {
        boards.push(loadBoard(splits[i]))
    }

    return {
        numbers: callingNumbers,
        boards,
    }
}

type BingoWinner = {
    lastNumber: number,
    board: BingoBoard,
}

export function firstWinner(room: BingoRoom): BingoWinner {

    for (const num of room.numbers) {
        for (const board of room.boards) {
            playNumber(board, num)
            const winner = checkBoard(board)
            if (winner !== undefined) {
                // console.log("FOUND WINNER", winner, board)
                return {
                    lastNumber: num, 
                    board
                }
            }
        }
    }

    throw new Error("there should always be a winner")
}

export function lastWinner(room: BingoRoom): BingoWinner {

    for (const num of room.numbers) {
        // console.log("NUM", num, room.boards.length)
        let spliceMe = []
        for (const board of room.boards) {
            playNumber(board, num)
            const winner = checkBoard(board)
            if (winner !== undefined) {
                if (room.boards.length ===1) {
                    // console.log("FOUND WINNER", winner, board)
                    return {
                        lastNumber: num, 
                        board
                    }
                }
                // otherwise, remove that board from contention
                const winIndex = room.boards.indexOf(board)
                // console.log("that winner", winner, winIndex)
                spliceMe.push(winIndex)
            }
        }
        for (const spliceIndex of spliceMe.reverse()) {
            room.boards.splice(spliceIndex, 1)
        }
        spliceMe = []
    }

    for (const b of room.boards) {
        printBoard(b)
    }

    throw new Error("there should always be a winner")
}

export function scoreWinner(winner: BingoWinner): number {
    let unmarkedSum = 0

    for (const row of winner.board) {
        for (const cell of row) {
            if (!cell[1]) {
                unmarkedSum += cell[0]
            }
        }
    }

    return unmarkedSum * winner.lastNumber

}

export function printBoard(board: BingoBoard) {
    let bstring = ''

    for (const row of board) {
        const rstr = row.map(cell => {
            if (cell[1]) {
                return `[${cell[0]}]`
            } else {
                return ` ${cell[0]} `
            }
        }).join('')
        bstring += rstr + '\n'
    }

    console.log(bstring)
}
