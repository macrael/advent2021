import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parsePacket, sumVersions, computePacket } from "./day16.ts"

Deno.test("parsebin", () => {
  const literalin = "D2FE28";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  assertEquals(ast.version, 6)

});

Deno.test("parse container", () => {
  const literalin = "38006F45291200";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = sumVersions(ast)

  assertEquals(sum, 9)

});

Deno.test("parse container2", () => {
  const literalin = "EE00D40C823060";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = sumVersions(ast)

  assertEquals(sum, 14)

});

Deno.test("parse three", () => {
  const literalin = "8A004A801A8002F478";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = sumVersions(ast)

  assertEquals(sum, 16)

});

Deno.test("parse four", () => {
  const literalin = "620080001611562C8802118E34";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = sumVersions(ast)

  assertEquals(sum, 12)

});

Deno.test("parse five", () => {
  const literalin = "C0015000016115A2E0802F182340";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = sumVersions(ast)

  assertEquals(sum, 23)

});

Deno.test("parse six", () => {
  const literalin = "A0016C880162017C3686B18A3D4780";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = sumVersions(ast)

  assertEquals(sum, 31)

});

Deno.test("sum", () => {
  const literalin = "C200B40A82";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 3)

});

Deno.test("prod", () => {
  const literalin = "04005AC33890";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 54)

});

Deno.test("min", () => {
  const literalin = "880086C3E88112";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 7)

});

Deno.test("max", () => {
  const literalin = "CE00C43D881120";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 9)

});

Deno.test("lt", () => {
  const literalin = "D8005AC2A8F0";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 1)

});

Deno.test("gt", () => {
  const literalin = "F600BC2D8F";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 0)

});

Deno.test("eq", () => {
  const literalin = "9C005AC2F8F0";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 0)

});

Deno.test("math", () => {
  const literalin = "9C0141080250320F1802104A08";

  const ast = parsePacket(literalin)
  console.log("OUT", ast)

  const sum = computePacket(ast)

  assertEquals(sum, 1)

});
