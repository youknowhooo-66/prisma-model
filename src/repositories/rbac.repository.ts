import prisma from '../database/prisma';

export class RoleRepository {
  async findByName(name: string) {
    return await prisma.role.findUnique({
      where: { name },
      include: { permissions: true }
    });
  }

  async create(name: string) {
    return await prisma.role.create({
      data: { name }
    });
  }

  async findAll() {
    return await prisma.role.findMany({
      include: { permissions: true }
    });
  }

  async connectPermission(roleId: string, permissionId: string) {
    return await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: { id: permissionId }
        }
      }
    });
  }
}

export class PermissionRepository {
  async findByName(name: string) {
    return await prisma.permission.findUnique({
      where: { name }
    });
  }

  async create(name: string) {
    return await prisma.permission.create({
      data: { name }
    });
  }

  async findAll() {
    return await prisma.permission.findMany();
  }
}
