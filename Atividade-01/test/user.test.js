import { describe, test, expect } from "vitest";
import { pessoa } from "../src/user.js";

describe("Testes do objeto usuário", () => {
  test("O ID do usuário deve ser igual a 1", () => {
    expect(pessoa.id).toBe(1);
  });

  test("O objeto usuário deve possuir exatamente os valores esperados", () => {
    expect(pessoa).toEqual({
      id: 1,
      nome: "Carlos",
      idade: 34,
      ativo: true,
      email: "carlos@email.com",

      endereco: {
        rua: "Rua das Flores",
        numero: 150,
        bairro: "Centro",
        cidade: "Maceió",
        estado: "AL",
        cep: "57000-000",
      },

      habilidades: ["JavaScript", "Node.js", "Express", "Git"],

      cursos: [
        {
          id: 1,
          nome: "Node.js",
          cargaHoraria: 40,
          concluido: true,
        },
        {
          id: 2,
          nome: "Express",
          cargaHoraria: 20,
          concluido: true,
        },
        {
          id: 3,
          nome: "Vitest",
          cargaHoraria: 12,
          concluido: false,
        },
      ],

      configuracoes: {
        tema: "dark",
        notificacoes: true,
        idioma: "pt-BR",
      },

      redesSociais: {
        github: "carlosdev",
        linkedin: "carlos-dev",
      },
    });
  });

  test("A lista de habilidades deve conter Git", () => {
    expect(pessoa.habilidades).toContain("Git");
  });

  test("A lista de cursos deve possuir 3 cursos cadastrados", () => {
    expect(pessoa.cursos).toHaveLength(3);
  });

  test("O objeto usuário deve possuir a propriedade email", () => {
    expect(pessoa).toHaveProperty("email");
  });

  test("O objeto usuário deve possuir a propriedade endereco.cidade", () => {
    expect(pessoa).toHaveProperty("endereco.cidade");
  });

  test("O usuário deve estar ativo", () => {
    expect(pessoa.ativo).toBeTruthy();
  });

  test("O curso Vitest ainda não foi concluído", () => {
    expect(pessoa.cursos.concluido).toBeFalsy();
  });

  test("O telefone do usuário deve ser nulo", () => {
    let telefone = null;
    expect(telefone).toBeNull();
  });

  test("O endereço de trabalho não deve possuir valor definido", () => {
    let endereco;
    expect(endereco).toBeUndefined();
  });

  test("O nome do usuário deve estar definido", () => {
    expect(pessoa.nome).toBeDefined();
  });

  test("Deve lançar um erro ao dividir um número por zero", (a,b) => {
    if(b === 0 || a === 0){
      throw new Error("O numero digitado é 0")
    }
    return a / b
  });

  test("O e-mail do usuário deve terminar com @email.com", () => {
    expect(pessoa.email).toMatch(/@email\.com$/)
  });

  test("A idade do usuário deve ser maior que 18 anos", () => {
    expect(pessoa.idade).toBeGreaterThan(18);
  });

  test("A idade do usuário deve ser menor que 60 anos", () => {
    expect(pessoa.idade).toBeLessThan(60);
  });

  test("O objeto pessoa deve ser uma instância da classe Pessoa", () => {
    // Crie a classe, a instância e escreva o teste aqui
  });
});