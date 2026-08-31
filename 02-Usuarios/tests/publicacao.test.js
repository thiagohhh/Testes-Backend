import { beforeAll, describe, expect, test } from "vitest";
import app from "../src/app.js";
import request from "supertest";
import { conn } from "../src/config/conn.js";
import { publicacaoModel } from "../src/models/index.js";

beforeAll(async () => {
  await conn.sync({ force: true });
});

const criarUsuario = async (dados = {}) => {
  return await request(app)
    .post("/usuarios")
    .send({
      nome: "Carlos Silva",
      email: `Usuario${Date.now()}${Math.random() * 1000}@gmail.com`,
      idade: 30,
      senha: "123",
      ...dados,
    });
};

const criarPublicacao = async (dados = {}) => {
  return await request(app)
    .post("/publicacoes")
    .send({
      publicacao: "Texto da publicacao",
      ...dados,
    });
};

describe("GET /publicacoes", () => {
  test(" - Deve retornar o status 200", async () => {
    await publicacaoModel.destroy({ where: {}, truncate: true });

    const usuario = await criarUsuario();
    await criarPublicacao({ usuario_id: usuario.body.id });

    const response = await request(app).get("/publicacoes");

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();

    expect(response.body).toHaveProperty("results");
    expect(response.body).toHaveProperty("info");
    expect(response.body.info).toHaveProperty("count");
    expect(response.body.info).toHaveProperty("pages");
    expect(response.body.results).toBeInstanceOf(Array);
    // expect(response.body.results).not.toBeInstanceOf(Array); testar se não é um array
  });
  test(" - Verificar dados do usuário", async () => {
    await publicacaoModel.destroy({ where: {}, truncate: true });

    const usuario = await criarUsuario({
      nome: "Carlos",
      idade: 34,
      email: "carlos@email.com",
    });
    await criarPublicacao({ usuario_id: usuario.body.id });

    const response = await request(app).get("/publicacoes");
  });

  test(" -> deve retornar status 400 caso parametros sejam invalidos", async () => {
    const response = await request(app).get("/publicacoes?page=-1&limit=abc");

    expect(response.status).toBe(400);
    expect(response.ok).toBeFalsy();
    expect(response.body.message).toBe("Parâmetros de paginação inválidos");
  });
  test(" -> deve retornar status 404 caso o id do usuário não exista", async () => {
    const response = await request(app).get("/publicacoes?usuario_id=99999");

    expect(response.status).toBe(404);
    expect(response.ok).toBeFalsy();
    expect(response.body.message).toBe("Usuario nao encontrado");
  });
});
