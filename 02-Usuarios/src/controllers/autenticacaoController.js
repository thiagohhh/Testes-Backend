import { usuarioModel } from "../models/index.js";
import bcrypt from "bcrypt";
import { tratarErro } from "../utils/errorHandle.js";
import { createUserToken } from "../utils/createUserToken.js";

export const Login = async (request, response) => {
  const { email, senha } = request.body;

  try {
    const usuarioEncontrado = await usuarioModel
      .scope("comSenha")
      .findOne({ where: { email } });

    if (!usuarioEncontrado) {
      return response.status(404).json({
        message: "Credenciais inváldias",
      });
    }

    const compararSenha = await bcrypt.compare(senha, usuarioEncontrado.senha);
    if (!compararSenha) {
      return response.status(401).json({
        message: "Credenciais inváldias",
      });
    }
    await createUserToken(usuarioEncontrado, request, response);
  } catch (error) {
    await tratarErro(error, response);
  }
};
