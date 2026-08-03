import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const livroModel = conn.define(
  "livros",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O titulo é obrigatório" },
        len: {
          msg: "O titulo deve conter entre 3 e 100 carcteres",
          args: [3, 100],
        },
      },
    },

    autor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O autor é obrigatório" },
        len: {
          msg: "O autor deve conter entre 3 e 100 carcteres",
          args: [3, 100],
        },
      },
    },

    editora: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A editora é obrigatório" },
        len: {
          msg: "A editora deve conter entre 3 e 100 carcteres",
          args: [3, 100],
        },
      },
    },

    ano_publicacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A ano_publicacao é obrigatório" },
        isInt: {
          msg: "A idade deve ser um número inteiro",
        },
      },
    },
  },
  {
    timestamps: false,
  },
);
