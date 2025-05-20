import { Router } from "express";
import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
} from "../controllers/ProdutosController";

const router = Router();

router.post("/Produtos", criarProduto);
router.get("/Produtos", listarProdutos);
router.get("/Produtos/:id", buscarProdutoPorId);
router.put("/Produtos/:id", atualizarProduto);
router.delete("/Produtos/:id", deletarProduto);

export default router;