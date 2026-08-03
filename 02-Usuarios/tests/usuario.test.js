import { beforeAll, describe, expect, Experimental, test } from "vitest";
import app from "../src/app.js";
import request from "supertest";
import { conn } from "../src/config/conn.js";
import { DATE } from "sequelize";
import { response } from "express";

beforeAll(async () => {
  await conn.sync({ force: true });
});

const criarUsuario = async (dados = []) => {
  return await request(app)
    .post("/usuarios")
    .send({
      nome: "Carlos Silva",
      email: `Usuario${Date.now()}${Math.random() * 1000}@gmail.com`,
      idade: 30,
      ...dados, // estudar
    });
};

describe("GET /usuarios", () => {
  test("Deve retorna o status 200", async () => {
    const response = await request(app).get("/usuarios");
    expect(response.status).toBe(200);
  });

  test("deve retorna status 404 caso o id do usuário não exista", async () => {
    const response = await request(app).get("/usuarios/99999");

    expect(response.status).toBe(404);
  });
  test("deve retorna a mensagem usuário não encontrado caso não exista", async () => {});
});

describe("POST /usuarios", () => {
  test("Deve retornar o status 201 e o Objeto criado exatamente com os valores experados", async () => {
    const dados = {
      nome: "Carlos Wilton",
      email: `carlos${Date.now()}@gmail.com`,
      idade: 34,
    };

    const response = await criarUsuario(dados);

    expect(response.status).toBe(201);
    expect(response.ok).toBeTruthy();

    //assetivas to Equal

    expect(response.body).toEqual({
      id: expect.any(Number),
      nome: dados.nome,
      email: dados.email,
      idade: dados.idade,
    });

    //Assetivass : toHaveProperty(

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", dados.email);

    // assetivas toBeDefinde
    expect(response.body.id).toBeDefined();
    // assetivas toBeUndefinde
    expect(response.body.senha).toBeUndefined();
  });

  describe("Campos Obrigatórios", () => {
    test("Deve retorna 400 quando o nome não for informado", async () => {
      const response = await criarUsuario({
        nome: null,
      });

      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
      expect(response.body.message).toBe("usuarios.nome cannot be null");
    });

    test("Deve retorna 400 quando o email não for informado", async () => {
      const response = await criarUsuario({
        email: null,
      });

      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
      expect(response.body.message).toBe("usuarios.email cannot be null");
    });

    test("Deve retorna 400 quando a idade não for informado", async () => {
      const response = await criarUsuario({
        idade: null,
      });

      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
      expect(response.body.message).toBe("usuarios.idade cannot be null");
    });
  });

  describe("Validações dos campos", async () => {
    test("Deve retorna status 400 quando nome possuir menos que 3 caracteres", async () => {
      const response = await criarUsuario({ nome: "A".repeat(2) });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "O nome deve conter entre 3 e 100 carcteres",
      );
    });
    test("Deve retorna status 400 quando nome possuir mais que 100 caracteres", async () => {
      const response = await criarUsuario({ nome: "A".repeat(101) });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "O nome deve conter entre 3 e 100 carcteres",
      );
    });

    test("Deve retorna status 400 quando o email for invalido", async () => {
      const emailInvalido = "email-invalido";
      const response = await criarUsuario({ email: emailInvalido });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Informe um e-mail válido");

      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      expect(emailInvalido).not.toMatch(emailRegex); //Assertiva toMatch
    });

    test("Deve retorna status 400 quando a idade for menor que 18", async () => {
      const idadeInvalida = 17;
      const response = await criarUsuario({ idade: idadeInvalida });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("A idade mínima permitida é 18 anos");
      expect(idadeInvalida).toBeLessThan(18);
    });

    test("Deve retorna status 400 quando a idade não for um número inteiro", async () => {
      const numero = "abc";
      const response = await criarUsuario({ idade: numero });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("A idade deve ser um número inteiro");
    });
    test("Deve retorna status 400 quando a idade for maior que 120", async () => {
      const idadeInvalida = 121;
      const response = await criarUsuario({ idade: idadeInvalida });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("A idade máxima permitida é 120 anos");
      expect(idadeInvalida).toBeGreaterThan(120);
    });
  });
});

describe("GET /usuarios/:id", () => {
  test("Deve retornar o status 200", async () => {
    const response = await request(app).get("/usuarios/1");
    expect(response.status).toBe(200);
  });

  test("deve retorna status 404 caso o id do usuário não exista", async () => {
    const response = await request(app).get("/usuarios/99999");

    expect(response.status).toBe(404);
  });
  test("deve retorna a mensagem usuário não encontrado caso não exista", async () => {
    const response = await request(app).get("/usuarios/99999");
    expect(response.body.message).toBe("Usuario nao encontrado");
  });
});

describe("PUT /usuarios/:id", () => {
  test("Deve retornar o status 200", async () => {
    const response = await request(app).put("/usuarios/1").send({
      nome: "Wilton",
      email: "maarlos@gmail.com",
      idade: 35,
    });

    expect(response.status).toBe(200);
  });

  test("deve retorna status 404 caso o id do usuário não exista", async () => {
    const response = await request(app).put("/usuarios/99999");

    expect(response.status).toBe(404);
  });
  test("deve retorna a mensagem usuário não encontrado caso não exista", async () => {
    const response = await request(app).put("/usuarios/99999");
    expect(response.body.message).toBe("Usuario nao encontrado");
  });
});

describe("DELETE /usuarios/:id", () => {
  test("Deve retornar o status 204", async () => {
    const response = await request(app).delete("/usuarios/1");
    expect(response.status).toBe(204);
  });

  test("deve retorna status 404 caso o id do usuário não exista", async () => {
    const response = await request(app).delete("/usuarios/99999");

    expect(response.status).toBe(404);
  });
});
