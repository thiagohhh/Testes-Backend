import { Router } from "express"
import {
    listarLivros,
    cadastrarLivro,
    buscarLivroPorId,
    atualizarLivro,
    excluirLivro
} from "../controllers/livroController.js"

const router = Router()

router.get("/", listarLivros)
router.post("/", cadastrarLivro)
router.get("/:id", buscarLivroPorId)
router.put("/:id", atualizarLivro)
router.delete("/:id", excluirLivro)

export default router