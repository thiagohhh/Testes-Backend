import express from "express";
import cors from "cors";
import UsuarioRouter from "./routes/UsuarioRouter.js";
import AutenticacaoRouter from "./routes/autenticacaoRouter.js";
import publicacaoRouter  from "./routes/publicacaoRouter.js"

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/usuarios", UsuarioRouter);
app.use("/auth", AutenticacaoRouter);
app.use("/publicacoes", publicacaoRouter)

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;
