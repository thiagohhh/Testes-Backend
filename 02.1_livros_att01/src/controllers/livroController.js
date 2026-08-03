import { livroModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandle.js";

export const cadastrarLivro = async (request, response) => {
  try {
    const livro = await livroModel.create(request.body);

    response.status(201).json(livro);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const listarLivros = async (request, response) => {
  try {
    const livros = await livroModel.findAll();

    response.status(200).json(livros);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const buscarLivroPorId = async (request, response) => {
  try {
    const livro = await livroModel.findByPk(request.params.id);

    if (!livro) {
      return response.status(404).json({
        message: "Livro não encontrado.",
      });
    }

    response.status(200).json(livro);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const atualizarLivro = async (request, response) => {
  try {
    const livro = await livroModel.findByPk(request.params.id);

    if (!livro) {
      return response.status(404).json({
        message: "Livro não encontrado.",
      });
    }

    await livro.update(request.body);

    response.status(200).json(livro);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const excluirLivro = async (request, response) => {
  try {
    const livro = await livroModel.findByPk(request.params.id);

    if (!livro) {
      return response.status(404).json({
        message: "Livro não encontrado.",
      });
    }

    await livro.destroy();

    response.sendStatus(204);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
