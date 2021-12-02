import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { makeWindows } from "./day1.ts"

Deno.test("windowing", () => {
    const ins = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    const expectedWindows = [607,618,618,617,647,716,769,792]

    const windows = makeWindows(ins)

    console.log(windows, expectedWindows)

    assertEquals(windows, expectedWindows)

})
