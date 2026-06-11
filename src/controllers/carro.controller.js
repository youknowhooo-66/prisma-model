
import { prisma } from "../../lib/prisma.js";

export class CarroController {

  static async listar(req, res) {
    const carros = await prisma.carro.findMany();

    return res.json(carros);
  }

  static async buscar(req, res) {
    const id = Number(req.params.id);

    const carro = await prisma.carro.findUnique({
      where: { id }
    });

    return res.json(carro);
  }

  static async criar(req, res) {
    try {
      const { nome, modelo, preco, marcaId, userId } = req.body;

      const carro = await prisma.carro.create({
        data: {
          nome,
          modelo,
          preco,
          marcaId: Number(marcaId),
          userId: Number(userId)
        }
      });

      return res.status(201).json(carro);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async atualizar(req,res) {
    const id = Number(req.params.id);

    const carro = await prisma.carro.update({
      where: { id },
      data: req.body
    });

    return res.json(carro);
  }

  static async excluir(req, res) {
    const id = Number(req.params.id);

    await prisma.carro.delete({
      where: { id }
    });

    return res.json({
      mensagem: "Carro excluído"
    });
  }
}