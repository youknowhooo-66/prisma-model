import prisma from '../database/prisma';
import { User } from '@prisma/client';

export class UserRepository {
  async create(data: { name: string; email: string }) {
    return await prisma.user.create({
      data,
      include: { roles: true }
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { permissions: true } } }
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: { roles: true }
    });
  }

  async findAll() {
    return await prisma.user.findMany({
      include: { roles: true }
    });
  }

  async update(id: string, data: Partial<{ name: string; email: string }>) {
    return await prisma.user.update({
      where: { id },
      data,
      include: { roles: true }
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  async assignRole(userId: string, roleId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          connect: { id: roleId }
        }
      },
      include: { roles: true }
    });
  }
}
