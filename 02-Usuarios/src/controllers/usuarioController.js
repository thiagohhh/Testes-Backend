import { usuarioModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandle.js";
import { createUserToken } from "../utils/createUserToken.js";
import bcrypt from "bcrypt";

export const listarUsuarios = async (request, response) => {
  try {

    const usuarios = await usuarioModel.findAll({
      attributes: { exclude: ["senha"] },
      raw: true,
    });
    return response.status(200).json(usuarios);
  } catch (error) {
    return await tratarErro(error, response);
  }
};

export const cadastrarUsuario = async (request, response) => {
  const { nome, email, idade, senha, verificaSenha } = request.body;


  if (nome === null) {
    return response.status(400).json({ message: "O campo nome é obrigatório" });
  }
  if (email === null) {
    return response
      .status(400)
      .json({ message: "O campo e-mail é obrigatório" });
  }
  if (idade === null) {
    return response
      .status(400)
      .json({ message: "O campo idade é obrigatório" });
  }

  if (senha !== verificaSenha) {
    return response.status(401).json({
      message: "As senhas precisam ser iguais",
    });
  }

  try {
  
    const saltRounds = process.env.NODE_ENV === "test" ? 1 : 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const senhaHash = bcrypt.hashSync(senha, salt);

    const dados = {
      nome,
      email,
      senha: senhaHash,
      idade,
    };

    const usuario = await usuarioModel.create(dados);

    await createUserToken(usuario, request, response);
  } catch (error) {
    return await tratarErro(error, response);
  }
};

export const buscarUsuarioPorId = async (request, response) => {
  try {

    const usuario = await usuarioModel.findByPk(request.params.id, {
      attributes: { exclude: ["senha"] },
      raw: true,
    });
    if (!usuario) {
      return response.status(404).json({ message: "Usuario nao encontrado" });
    }
    return response.status(200).json(usuario);
  } catch (error) {
    return await tratarErro(error, response);
  }
};

export const atualizarUsuario = async (request, response) => {
  const id = Number(request.params.id);

  try {
    const usuarioToken = request.usuario;

    if (id !== usuarioToken.id) {
      return response.status(403).json({ message: "Não autorizado" });
    }

    const usuario = await usuarioModel.findByPk(id);

    if (!usuario) {
      return response.status(404).json({ message: "Usuario nao encontrado" });
    }

    await usuario.update(request.body);

    // OTIMIZAÇÃO: Limpa a senha do retorno antes de enviar a resposta
    const resultado = usuario.get({ plain: true });
    delete resultado.senha;

    return response.status(200).json(resultado);
  } catch (error) {
    return await tratarErro(error, response);
  }
};

export const excluirUsuario = async (request, response) => {
  try {
    // OTIMIZAÇÃO: Executa o destroy com cláusula where direto (apenas 1 ida ao banco em vez de 2)
    const deletado = await usuarioModel.destroy({
      where: { id: request.params.id },
    });

    if (!deletado) {
      return response.status(404).json({ message: "Usuario nao encontrado" });
    }
    return response.status(204).send();
  } catch (error) {
    return await tratarErro(error, response);
  }
};
