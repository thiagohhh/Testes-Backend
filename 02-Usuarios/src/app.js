import express from "express"
import cors from "cors"
import  UsuarioRouter  from "./routes/UsuarioRouter.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET","POST", "PUT", "PATCH", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.use("/usuarios", UsuarioRouter)

app.use((request, response)=>{
    response.status(404).json({message: "Rota não encontrada"})
})

export default app