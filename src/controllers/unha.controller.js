import express from "express";
import { prisma } from "../../lib/prisma.js";

export class UnhaController {

  static async listar(req,res){
    const unhas = await prisma.unha.findMany();
    return res.json(unhas);
  }

  static async buscar(req,res){
    const id = Number(req.params.id);

    const unha = await prisma.unha.findUnique({
      where: { id }
    });

    return res.json(unha);
  }

  static async criar(req,res){
    try {
      const { cor, tamanho, preco, userId } = req.body;

      const unha = await prisma.unha.create({
        data: {
          cor,
          tamanho,
          preco,
          userId: Number(userId)
        }
      });

      return res.status(201).json(unha);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async atualizar(req,res){
    const id = Number(req.params.id);

    const unha = await prisma.unha.update({
      where: { id },
      data: req.body
    });

    return res.json(unha);
  }

  static async excluir(req,res){
    const id = Number(req.params.id);

    await prisma.unha.delete({
      where: { id }
    });

    return res.json({
      mensagem: "Unha removida"
    });
  }
}