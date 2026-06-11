import { prisma } from "../../lib/prisma.js"

export class UserController {

  static async listar(req,res){
    const users = await prisma.user.findMany({
      include: {
        posts: true
      }
    });

    return res.json(users);
  }

  static async buscar(req,res){
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true
      }
    });

    return res.json(user);
  }

  static async criar(req,res){

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name
      }
    });

    return res.status(201).json(user);
  }

  static async atualizar(req,res){
    const id = Number(req.params.id);

    const user = await prisma.user.update({
      where: { id },
      data: {
        email: req.body.email,
        name: req.body.name
      }
    });

    return res.json(user);
  }

  static async excluir(req,res){
    const id = Number(req.params.id);

    await prisma.user.delete({
      where: { id }
    });

    return res.json({
      mensagem: "Usuário excluído"
    });
  }
}