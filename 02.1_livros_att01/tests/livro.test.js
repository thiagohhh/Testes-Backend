import { beforeAll, describe, expect, Experimental, test } from "vitest";
import app from "../src/app.js";
import request from "supertest";
import { conn } from "../src/config/conn.js";
import { DATE } from "sequelize";
import { response } from "express";

beforeAll(async () => {
  await conn.sync({ force: true });
});

const cadastrarLivro = async (dados = []) => {
  return await request(app)
    .post("/livros")
    .send({
      titulo: "Capitães de areia",
      autor: "Da vinci",
      editora: "Ibratin",
      ano_publicacao: 2067,
      ...dados, // estudar
    });
};

describe.skip("GET /livros", () => {});

describe("POST /livros", () => {
  test("Deve retornar o status 201 e o Objeto criado exatamente com os valores experados", async () => {
    const dados = {
      titulo: "Carlos Wilton",
      autor: `carlos`,
      editora: "posda",
      ano_publicacao: 2045,
    };

    const response = await cadastrarLivro(dados);

    expect(response.status).toBe(201);
    expect(response.ok).toBeTruthy();

    //assetivas to Equal

    expect(response.body).toEqual({
      id: expect.any(Number),
      titulo: dados.titulo,
      autor: dados.autor,
      editora: dados.editora,
      ano_publicacao: dados.ano_publicacao,
    });
  });

  describe.skip("Campos Obrigatórios", async ()=>{})
  
  describe.skip("Validações dos campos", async ()=>{})
});

describe.skip("GET /livros/:id", () => {});

describe.skip("PUT /livros/:id", () => {});

describe.skip("DELETE /livros/:id", () => {});
