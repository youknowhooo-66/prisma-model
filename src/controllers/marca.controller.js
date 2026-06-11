import express from "express";
import { prisma } from "../../lib/prisma.js";

export class MarcaController {
  static async listar(req,res){
    try {
      const marcas = await prisma.marcas.findMany({
        orderBy: {
          nome: "asc",
        },
      });

      return res.json(marcas);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async buscar(req,res){
    try {
      const id = Number(req.params.id);

      const marca = await prisma.marcas.findUnique({
        where: { id },
      });

      if (!marca) {
        return res.status(404).json({
          mensagem: "Marca não encontrada",
        });
      }

      return res.json(marca);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async novaMarca(req,res){
    try {
      const marcasData = [
        { nome: "Toyota", anoModelo: 2024, anoFabricacao: 2023 },
        { nome: "Honda", anoModelo: 2024, anoFabricacao: 2024 },
        { nome: "Ford", anoModelo: 2023, anoFabricacao: 2023 },
        { nome: "Chevrolet", anoModelo: 2024, anoFabricacao: 2023 },
        { nome: "BMW", anoModelo: 2025, anoFabricacao: 2024 },
        { nome: "Mercedes", anoModelo: 2024, anoFabricacao: 2024 },
        { nome: "Volkswagen", anoModelo: 2023, anoFabricacao: 2022 },
        { nome: "Fiat", anoModelo: 2024, anoFabricacao: 2024 },
        { nome: "Hyundai", anoModelo: 2024, anoFabricacao: 2023 },
        { nome: "Nissan", anoModelo: 2023, anoFabricacao: 2023 },
      ];

      const marcas = await prisma.marcas.createMany({
        data: marcasData,
        skipDuplicates: true,
      });

      return res.status(201).json({
        mensagem: "10 exemplos de marcas criados com sucesso",
        quantidade: marcas.count,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async atualizarMarca(req,res){
    try {
      const id = Number(req.params.id);
      const { nome, anoModelo, anoFabricacao, ativo } = req.body;

      const marca = await prisma.marcas.upsert({
        where: { id: id || 0 },
        update: {
          nome,
          anoModelo,
          anoFabricacao,
          ativo,
        },
        create: {
          nome,
          anoModelo,
          anoFabricacao,
          ativo: ativo ?? true,
        },
      });

      return res.json(marca);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async excluirMarca(req,res){
    try {
      const id = Number(req.params.id);

      await prisma.marcas.delete({
        where: { id },
      });

      return res.json({
        mensagem: "Marca excluída com sucesso",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}