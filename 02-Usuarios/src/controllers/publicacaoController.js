import { expectTypeOf } from "vitest";
import { publicacaoModel, usuarioModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandle.js";
import { getToken } from "../utils/getToken.js";
import { getUserByToken } from "../utils/getUserByToken.js";
import { request, response } from "express";

export const listarPublicacao = async (request, response) => {
  const { page: queryPage, limit: queryLimit, usuario_id } = request.query;


  const page = Number(queryPage) || 1;
  const limit = Number(queryLimit) || 9;

  if (page <= 0 || isNaN(limit) || limit <= 0) {
    return response.status(400).json({ message: "Parâmetros de paginação inválidos" });
  }

  const offset = (page - 1) * limit;
  const where = {};

  try {
  
    if (usuario_id) {
      const usuarioExiste = await usuarioModel.findByPk(usuario_id);
      if (!usuarioExiste) {
        return response.status(404).json({ message: "Usuario nao encontrado" }); 
      }
      where.usuario_id = usuario_id;
    }

  
    const { count, rows } = await publicacaoModel.findAndCountAll({
      where,
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      include: {
        model: usuarioModel,
        attributes: {
          exclude: ["senha", "idade"],
        },
      },
      offset,
      limit,
    });

   
    const pages = Math.ceil(count / limit) || 1;

  
    return response.status(200).json({
      results: rows,
      info: {
        count,
        pages,
      },
    });
  } catch (error) {
    await tratarErro(error, response);
  }
};
export const criarPublicacao = async (request, response) => {
  const { publicacao } = request.body;
  try {
    const token = await getToken(request);
    const usuarioToken = await getUserByToken(token);

    const data = {
      publicacao,
      usuario_id: usuarioToken.id,
    };

    await publicacaoModel.create(data);

    response.status(201).json({ message: "Publicação criada com sucessos" });
  } catch (error) {
    await tratarErro(error, response);
  }
};
export const buscarPublicacaoPorId = async (request, response) => {
  const { id } = request.params;

  try {
    const publicacao = await publicacaoModel.findByPk(id, {
      attributes: {
        exclude: ["usuario_id"],
      },
      include: {
        model: usuarioModel,
        attributes: {
          exclude: ["email", "senha", "idade", "id"],
        },
      },
    });

    if (!publicacao) {
      response.status(404).json({ error: "Publicação não encontrada" });
      return;
    }

    response.status(200).json(publicacao);
  } catch (error) {
    await tratarErro(error, response);
  }
};
export const atualizarPublicacao = async (request, response) => {
  const { id } = request.params;
  const { publicacao } = request.body;
  try {
    const token = await getToken(request);
    const userToken = await getUserByToken(token);
    const publicacaoEncontrada = await publicacaoModel.findByPk(id);
    if (!publicacao) {
      response.status(404).json({ error: "Publicação não encontrada" });
      return;
    }

    if (publicacaoEncontrada.usuario_id != userToken.id) {
      response.status(403).json({ error: "Não autorizado" });
      return;
    }

    await publicacaoEncontrada.update({
      publicacao,
    });

    response.status(200).json({
      message: "PublicaçãO atualizada",
    });
  } catch (error) {
    await tratarErro(error, response);
  }
};
export const deletarPublicacao = async (request, response) => {
  const { id } = request.params;

  try {
    const token = await getToken(request);
    const userToken = await getUserByToken(token);
    const publicacaoEncontrada = await publicacaoModel.findByPk(id);

    if (!publicacao) {
      response.status(404).json({ error: "Publicação não encontrada" });
      return;
    }

    if (publicacaoEncontrada.usuario_id != userToken.id) {
      response.status(403).json({ error: "Não autorizado" });
      return;
    }

    await publicacaoEncontrada.destroy({
      publicacao,
    });

    response.status(200).json({
      message: "PublicaçãO deletada",

    });
  } catch (error) {
    await tratarErro(error, response);
  }
};