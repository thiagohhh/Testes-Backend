import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  criarPublicacao,
  listarPublicacao,
  atualizarPublicacao,
  deletarPublicacao,
  buscarPublicacaoPorId,
} from "../controllers/publicacaoController.js";

const router = Router();

router.post("/", verifyToken, criarPublicacao);
router.get("/", listarPublicacao);
router.get("/:id", buscarPublicacaoPorId);
router.put("/:id", verifyToken, atualizarPublicacao);
router.delete("/:id", verifyToken, deletarPublicacao);

export default router;
