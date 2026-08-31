import { tratarErro } from "../utils/errorHandle.js";
import { getToken } from "../utils/getToken.js";
import jwt from "jsonwebtoken";
export const verifyToken = async (request, response, next) => {
  try {
    if (!request.headers.authorization) {
      return response.status(401).json({
        message:
          "O cabeçalho 'Authorization' é obrigatório e deve conter um token Bearer",
      });
    }

    const token = await getToken(request);
    if (!token) {
      return response.status(401).json({
        message: "Verifique se o token está presente",
      });
    }

    let verified;
    try {
      verified = jwt.verify(token, "SENHASUPERSEGURA");
      console.log(verified);
    } catch (jwtError) {
      let message;

      if (jwtError.name === "TokenExpiredError") {
        message = "Token expirado. Por favor, faça login novamente";
      } else if (jwtError.name === "JsonWebTokenError") {
        message =
          "Token inválido.O token não confere com a chave de validação, ou token foi adulterado";
      } else {
        message = "Erro ao validar token";
      }

      return response.status(401).json({ message });
    }

    request.usuario = verified;

    next();
  } catch (error) {
    await tratarErro(error, response);
  }
};
