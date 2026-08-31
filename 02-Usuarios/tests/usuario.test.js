import { beforeAll, describe, expect, test } from "vitest";
import app from "../src/app.js";
import request from "supertest";
import { conn } from "../src/config/conn.js";
import { usuarioModel } from "../src/models/index.js";
import { verifyToken } from "../src/middleware/verifyToken.js";
import jwt from "jsonwebtoken";

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
      senha: "SenhaValida123",
      verificaSenha: "SenhaValida123",
      ...dados,
    });
};

describe("POST /usuarios", () => {
  test(" - Deve retornar o status 200 e o Objeto criado exatamente com os valores experados", async () => {
    const dados = {
      nome: "Carlos Wilton",
      email: `carlos${Date.now()}@gmail.com`,
      idade: 34,
      senha: "123456789",
      verificaSenha: "123456789",
    };

    const response = await criarUsuario(dados);

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();

    expect(response.body).toEqual({
      sucess: true,
      message: "Você está autenticado",
      statusCode: 200,
      token: expect.any(String),
      usuarioId: expect.any(Number),
    });

    expect(response.body).toHaveProperty("usuarioId");
    expect(response.body).toHaveProperty("token");

    expect(response.body.usuarioId).toBeDefined();
    expect(response.body.senha).toBeUndefined();
  });

  describe(" - Campos Obrigatórios", () => {
    test(" -> Deve retorna 400 quando o nome não for informado", async () => {
      const response = await criarUsuario({ nome: null });

      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
      expect(response.body.message).toBe("O campo nome é obrigatório");
    });

    test(" -> Deve retorna 400 quando o email não for informado", async () => {
      const response = await criarUsuario({ email: null });

      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
      expect(response.body.message).toBe("O campo e-mail é obrigatório");
    });

    test(" -> Deve retorna 400 quando a idade não for informado", async () => {
      const response = await criarUsuario({ idade: null });

      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
      expect(response.body.message).toBe("O campo idade é obrigatório");
    });

    test(" -> Deve retorna 401 quando as senhas não forem iguais", async () => {
      const response = await criarUsuario({
        senha: "Senha 01",
        verificaSenha: "Senha 02",
      });

      expect(response.status).toBe(401);
      expect(response.ok).toBeFalsy();
      expect(response.body.message).toBe("As senhas precisam ser iguais");
    });
  });

  describe(" - Validações dos campos", () => {
    test(" -> Deve retorna status 400 quando nome possuir menos que 3 caracteres", async () => {
      const response = await criarUsuario({ nome: "A".repeat(2) });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "O nome deve conter entre 3 e 100 carcteres",
      );
    });

    test(" -> Deve retorna status 400 quando nome possuir mais que 100 caracteres", async () => {
      const response = await criarUsuario({ nome: "A".repeat(101) });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "O nome deve conter entre 3 e 100 carcteres",
      );
    });

    test(" -> Deve retorna status 400 quando o email for invalido", async () => {
      const emailInvalido = "email-invalido";
      const response = await criarUsuario({ email: emailInvalido });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Informe um e-mail válido");

      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      expect(emailInvalido).not.toMatch(emailRegex);
    });

    test(" -> Deve retorna status 400 quando a idade for menor que 18", async () => {
      const idadeInvalida = 17;
      const response = await criarUsuario({ idade: idadeInvalida });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("A idade mínima permitida é 18 anos");
      expect(idadeInvalida).toBeLessThan(18);
    });

    test(" -> Deve retorna status 400 quando a idade não for um número inteiro", async () => {
      const numero = "abc";
      const response = await criarUsuario({ idade: numero });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("A idade deve ser um número inteiro");
    });

    test(" -> Deve retorna status 400 quando a idade for maior que 120", async () => {
      const idadeInvalida = 121;
      const response = await criarUsuario({ idade: idadeInvalida });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("A idade máxima permitida é 120 anos");
      expect(idadeInvalida).toBeGreaterThan(120);
    });
  });
});

describe("GET /usuarios", () => {
  test(" - Deve retorna o status 200 e a lsita de usuarios com as propriedades corretas", async () => {
    await usuarioModel.destroy({ where: {} });

    await usuarioModel.create({
      nome: "Carlos",
      email: "carlos@email.com",
      idade: 34,
      senha: "senha_hash_fake",
    });
    await usuarioModel.create({
      nome: "Wilton",
      email: "wilton@email.com",
      idade: 35,
      senha: "senha_hash_fake",
    });

    const response = await request(app).get("/usuarios");

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveLength(2);

    const emails = response.body.map((usuario) => usuario.email);
    expect(emails).toContain("carlos@email.com");
  });
});

describe("GET /usuarios/:id", () => {
  test(" - Deve retornar o status 200", async () => {
    const usuario = await criarUsuario();
    const response = await request(app).get(
      `/usuarios/${usuario.body.usuarioId}`,
    );

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();
    expect(response.body.id).toBe(usuario.body.usuarioId);
  });

  test(" -> deve retorna status 404 caso o id do usuário não exista", async () => {
    const response = await request(app).get("/usuarios/99999");

    expect(response.status).toBe(404);
    expect(response.ok).toBeFalsy();
  });

  test(" -> deve retorna a mensagem usuário não encontrado caso não exista", async () => {
    const response = await request(app).get("/usuarios/99999");
    expect(response.ok).toBeFalsy();
    expect(response.body.message).toBe("Usuario nao encontrado");
  });
});

describe("PUT /usuarios/:id", () => {
  test(" -> Deve retornar o status 200", async () => {
    const email = `carlos${Date.now()}@email.com`;
    const usuario = await criarUsuario();
    const dadosAtualizados = {
      nome: "jose",
      email,
      idade: 23,
    };

    const response = await request(app)
      .put(`/usuarios/${usuario.body.usuarioId}`)
      .set("Authorization", `Bearer ${usuario.body.token}`)
      .send(dadosAtualizados);

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();

    expect(response.body).toEqual({
      id: usuario.body.usuarioId,
      ...dadosAtualizados,
    });
  });

  test(" -> deve retorna status 404 caso o id do usuário não exista", async () => {
    const token = jwt.sign(
      { id: 99999, email: "qualquercosia@gmail.com", idade: 30 },
      "SENHASUPERSEGURA",
    );

    const response = await request(app)
      .put("/usuarios/99999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Wilton",
        email: "maarlos@gmail.com",
        idade: 35,
      });

    expect(response.status).toBe(404);
    expect(response.ok).toBeFalsy();
  });

  test(" -> deve retorna a mensagem usuário não encontrado caso não exista", async () => {
    const token = jwt.sign(
      { id: 99999, email: "qualquercosia@gmail.com", idade: 30 },
      "SENHASUPERSEGURA",
    );
    const response = await request(app)
      .put("/usuarios/99999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Wilton",
        email: "maarlos@gmail.com",
        idade: 35,
      });

    expect(response.ok).toBeFalsy();
    expect(response.body.message).toBe("Usuario nao encontrado");
  });
});

describe("DELETE /usuarios/:id", () => {
  test(" -> Deve retornar o status 204", async () => {
    const usuario = await criarUsuario();

    const response = await request(app)
      .delete(`/usuarios/${usuario.body.usuarioId}`)
      .set("Authorization", `Bearer ${usuario.body.token}`);

    expect(response.status).toBe(204);
    expect(response.ok).toBeTruthy();
  });

  test(" -> deve retorna status 404 caso o id do usuário não exista", async () => {
    const token = jwt.sign(
      { id: 99999, email: "qualquercoisa@gmial.com", idade: 30 },
      "SENHASUPERSEGURA",
    );

    const response = await request(app)
      .delete("/usuarios/99999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.ok).toBeFalsy();
  });
});
