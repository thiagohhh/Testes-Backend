import { Router } from "express";
import {
  listarUsuarios,
  cadastrarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
} from "../controllers/usuarioController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", cadastrarUsuario);
router.get("/:id", buscarUsuarioPorId);
router.put("/:id", verifyToken, atualizarUsuario);
router.delete("/:id", verifyToken, excluirUsuario);

export default router;
