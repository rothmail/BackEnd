import { Request, Response } from "express";
import { Produto, produtos } from "../models/Produto";

let id: number = 0; // escopo global

export const criarProduto = (req: Request, res: Response) => {
  const { nome, preco, quantidade } = req.body;

  if (!nome || !preco || !quantidade) {
    res.status(400).json({ mensagem: "Todos os campos são obrigatorios!" });
    return;
  }

  id += 1;
  const novoProduto = new Produto(id, nome, preco, quantidade);
  produtos.push(novoProduto);
  res
    .status(201)
    .json({ mensagem: "Produto criado com sucesso!", Produto: novoProduto });
  return;
};

export const listarProdutos = (req: Request, res: Response) => {
  res.status(200).json(produtos);
};

export const buscarProdutoPorId = (req: Request, res: Response) => {
  id = Number(req.params.id);
  const Produto = produtos.find((u) => u.id === id);
  if (!Produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  res.status(200).json(Produto);
  return;
};

export const atualizarProduto = (req: Request, res: Response) => {
  id = Number(req.params.id);
  const { nome, preco, quantidade } = req.body;

  if (!id) {
    res.status(400).json({ mensagem: "ID é obrigatorio" });
    return;
  }

  if (!nome && !preco && !quantidade) {
    res.status(400).json({ mensagem: "Preencha ao menos um campo" });
    return;
  }

  const Produto = produtos.find((u) => u.id === id);

  if (!Produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  Produto.nome = nome || Produto.nome;
  Produto.preco = preco || Produto.preco;
  Produto.quantidade = quantidade || Produto.quantidade;

  res
    .status(200)
    .json({ mensagem: "Produto atualizado com sucesso!", Produto });
};

export const deletarProduto = (req: Request, res: Response) => {
  id = Number(req.params.id);

  if (!id) {
    res.status(400).json({ mensagem: "ID é obrigatorio" });
    return;
  }

  const index = produtos.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  produtos.splice(index, 1);
  res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
};