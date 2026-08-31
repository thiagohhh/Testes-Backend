import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const usuarioModel = conn.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O nome é obrigatório" },
        len: {
          msg: "O nome deve conter entre 3 e 100 carcteres",
          args: [3, 100],
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Já existe um usuário cadastrado com esse e-mail",
      },
      validate: {
        notEmpty: { msg: "O e-mail é obrigatório" },
        isEmail: {
          msg: "Informe um e-mail válido",
        },
      },
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: { msg: "A senha é obrigatório" },
      len: {
        msg: "O senha deve possuir entre 3 e 100 carcteres",
        args: [8, 100],
      },
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A idade é obrigatório" },
        isInt: {
          msg: "A idade deve ser um número inteiro",
        },
        min: {
          msg: "A idade mínima permitida é 18 anos",
          args: [18],
        },
        max: {
          msg: "A idade máxima permitida é 120 anos",
          args: [120],
        },
      },
    },
  },
  {
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ["senha"], // não vai mostrar a senha
      },
    },

    scopes: {
      comSenha: {
        attributes: {}, // todos os atributos
      },
    },
  },
);
