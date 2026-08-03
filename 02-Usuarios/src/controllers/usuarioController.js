import { usuarioModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandle.js";

export const listarUsuarios = async (request, response) => {
  try {
    const usuarios = await usuarioModel.findAll();

    response.status(200).json(usuarios);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const cadastrarUsuario = async (request, response) => {
  try {
    const usuarios = await usuarioModel.create(request.body);

    response.status(201).json(usuarios);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const buscarUsuarioPorId = async (request, response) => {
  try {
    const usuarios = await usuarioModel.findByPk(request.params.id);

    if (!usuarios) {
      response.status(404).json({ message: "Usuario nao encontrado" });
      return;
    }
    response.status(200).json(usuarios);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const atualizarUsuario = async (request, response) => {
  try {
    const usuarios = await usuarioModel.findByPk(request.params.id);

    if (!usuarios) {
      response.status(404).json({ message: "Usuario nao encontrado" });
      return;
    }
    await usuarios.update(request.body);

    response.status(200).json(usuarios);
  } catch (error) {
    return await tratarErro(error, response);
  }
};
export const excluirUsuario = async (request, response) => {
  try {
    const usuarios = await usuarioModel.findByPk(request.params.id);

    if (!usuarios) {
      response.status(404).json({ message: "Usuario nao encontrado" });
      return;
    }
    await usuarios.destroy();

    response.status(204).send();
  } catch (error) {
    return await tratarErro(error, response);
  }
};
