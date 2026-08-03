import express from "express"
import cors from "express"
import livroRoutes from "./routes/livroRouters.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.use("/livros", livroRoutes)

app.use((request, response) => {
    response.status(404).json({
        status: 404,
        statusError: "Not Found",
        error: "Rota não encontrada"
    })
})

export default app