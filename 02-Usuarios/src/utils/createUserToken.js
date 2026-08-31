import jwt from "jsonwebtoken";
import { tratarErro } from "./errorHandle.js";

const senhaToken = "SENHASUPERSEGURA";

export const createUserToken = async (usuario, request, response) => {
  try {
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        idade: usuario.idade,
        role: usuario.role,
      },
      senhaToken,
      {
        expiresIn: "12h",
      },
    );

    response.status(200).json({
      sucess: true,
      statusCode: 200,
      message: "Você está autenticado",
      token: token,
      usuarioId: usuario.id,
    });
  } catch (error) {
    await tratarErro(error, response);
  }
};
