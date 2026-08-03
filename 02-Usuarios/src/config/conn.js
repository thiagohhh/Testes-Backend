import {Sequelize} from "sequelize"

export const conn = new Sequelize("usuario3g","root","123456789", {
    host: "localhost",
    dialect: "mysql"
})