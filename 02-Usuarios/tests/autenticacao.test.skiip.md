import { beforeAll, describe, expect, Experimental, test } from "vitest";
import app from "../src/app.js";
import request from "supertest";
import { conn } from "../src/config/conn.js";
import { response } from "express";

beforeAll(async () => {
  await conn.sync({ force: true });
});

describe("POST auth/login", () => {
  test("Deve fazer Login com sucesso e retorna o token", async () => {
    const email = `auth${Date.now()}@email.com`;
    const senha = "SENHASUPERSEGURA123";

    await request(app).post("/usuarios").send({
      nome: "Usuario Autenticado",
      email,
      idade: 25,
      senha,
      verificaSenha: senha,
    });

    const response = await request(app)
      .post("/auth/login")
      .send({ email, senha });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("sucess", true);
    expect(response.body).toHaveProperty("token");
  });
  test("Deve retorna 404 para senha não cadastrado", async () => {
    const email = `auth${Date.now()}@email.com`;
    const senha = "SENHASUPERSEGURA123";

    await request(app).post("/usuarios").send({
      nome: "Usuario Autenticado",
      email,
      idade: 25,
      senha,
      verificaSenha: senha,
    });

    const response = await request(app)
      .post("/auth/login")
      .send({ email, senha: "senha incorreta" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Credenciais inváldias");
  });
  test("Deve retorna 404 para e-email não cadastrado ", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "emailCorreto@gmail.com", senha: "qualquer Senha" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Credenciais inváldias");
  });
});