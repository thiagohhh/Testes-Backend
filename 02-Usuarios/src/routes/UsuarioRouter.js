import { Router } from "express";
import {
  listarUsuarios,
  cadastrarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", cadastrarUsuario);
router.get("/:id", buscarUsuarioPorId);
router.put("/:id", atualizarUsuario);
router.delete("/:id", excluirUsuario);

export default router;
