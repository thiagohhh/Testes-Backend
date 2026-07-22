import { somar, subtrair, multiplicar, dividir } from "../src/calculadora.js";

import { describe, expect, test } from "vitest";

//Suite de teste é um conjunto
//de casos de teste relacionados entre si
describe("testar módulo de calculadora", () => {
  //caso de teste é uma verificação especifica
  //de um comportamento do sistema
  test("A função somar deve somar dois números", () => {
    expect(somar(3, 5)).toBe(8);
  });
  test("A função subtrair deve subtrair dois números", () => {
    expect(subtrair(3, 5)).toBe(-2);
  });
  test("A função multiplicar deve multiplciar dois números", () => {
    expect(multiplicar(3, 5)).toBe(15);
  });
  test("A função dividir deve dividir dois números", () => {
    expect(dividir(10, 5)).toBe(2);
  });
});
