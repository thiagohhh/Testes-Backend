import { user } from "../src/user.js";
import { describe, expect, test } from "vitest";

describe("Assetivas do Vitest", () => {
  //1
  test("O id do usuário deve ser igual 1", () => {
    expect(user.id).toBe(1);
  });
  //2
  test("O objeto usuário deve possuir exatamente os valores esperados", () => {
    expect(user).toEqual({
      id: 1,
      nome: "Thiago",
      idade: 43,
      ativo: true,
      cursos: ["Node", "Express", "Vitest"],
    });
  });
  //3
  test("A lista de cursos deve possuir o curso express", () => {
    expect(user.cursos).toContain("Express");
  });
  //4
  test("A lista de cursos deve possuir 3 elementos", () => {
    expect(user.cursos).toHaveLength(3);
  });
  //5
  test("O objeto usuário deve possuir a propriedade idade", () => {
    expect(user).toHaveProperty("idade");
  });
  //6
  test("O usuário deve estar ativo", () => {
    expect(user.ativo).toBeTruthy();
  });
  //7
  test("O usuario não deve ser administrador", () => {
    const admnin = false;
    expect(admnin).toBeFalsy();
  });
  //8
  test("O telefone deve ser nulo", () => {
    const telefone = null;
    expect(telefone).toBeNull();
  });
  //9
  test("O endereco não deve possuir valor definido", () => {
    let endereco;
    expect(endereco).toBeUndefined();
  });
  //10
  test("O nome do usuário deve estar definido", () => {
    expect(user.nome).toBeDefined();
  });
  //11
  test("O nome do usuário deve ser Thiago", () => {
    expect(user.nome).match(/^Thiago$/);
  });
  //12
   test("A idade do usuário deve ser maior que 18", () => {
    expect(user.idade).toBeGreaterThan(18);
  });
  //13
    test("A idade do usuário deve ser menor que 60", () => {
    expect(user.idade).toBeLessThan(60);
  });
});

//ToBe-
//ToBeTruthy-
//ToBeFalsy-
//ToBeNull-
//ToHaveProperty-
//ToHaveLength-
//ToContain-
//ToEqual-

// Ve se é igaula aisso - toEuqual
// Ver se é isso

//TO CONTAIN - Ver se contem tal coisa em algum lugar
// assetivas
