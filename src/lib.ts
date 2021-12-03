
export async function readLines(filename: string): Promise<string[]> {
    const inputs = await Deno.readTextFile(filename)
    const lines = inputs.trim().split('\n')

    return lines
}
