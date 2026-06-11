import express from "express";
import { prisma } from "../../lib/prisma.js";

export class PostController {

  static async listar(req,res){
    const posts = await prisma.post.findMany({
      include: {
        author: true
      }
    });

    return res.json(posts);
  }

  static async buscar(req,res){
    const id = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true
      }
    });

    return res.json(post);
  }

  static async criar(req,res){
    const { title, content, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId
      }
    });

    return res.status(201).json(post);
  }

  static async atualizar(req,res){
    const id = Number(req.params.id);

    const post = await prisma.post.update({
      where: { id },
      data: req.body
    });

    return res.json(post);
  }

  static async excluir(req,res){
    const id = Number(req.params.id);

    await prisma.post.delete({
      where: { id }
    });

    return res.json({
      mensagem: "Post removido"
    });
  }
}