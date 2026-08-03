import "./models/index.js"
import app from "./app.js";
import { conn } from "./config/conn.js";


const PORT = 3333

const iniciarServidor = async () => {
    try {
        await conn.sync()

        app.listen(PORT, () => {
            console.log("Servidor inciado em http://localhots:", PORT)
            console.log("Rotas da aplicação")
            console.log(`GET http://localhost:${PORT}/livros`)
            console.log(`GET http://localhost:${PORT}/livros/:id`)
            console.log(`POST http://localhost:${PORT}/livros`)
            console.log(`PUT http://localhost:${PORT}/livros/:id`)
            console.log(`DELETE http://localhost:${PORT}/livros/:id`)
        })
    } catch (error) {
        console.log("Erro ao iniciar o servidor:", error.message);
    }
}

await iniciarServidor()