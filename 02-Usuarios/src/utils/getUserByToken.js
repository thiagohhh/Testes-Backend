import jwt from "jsonwebtoken";
import { usuarioModel } from "../models/index.js";

export const getUserByToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    if (!token) {
      throw new Error("Acesso negado");
    }

    const decoded = jwt.verify(token, "SENHASUPERSEGURA");

    const usuario = await usuarioModel.findByPk(decoded.id);

    if (!usuario) {
      throw new Error("Usuario não encontrado");
    }

    return usuario;
  });
};
