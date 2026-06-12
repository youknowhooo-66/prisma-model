import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding roles and permissions...');

  // Permissions
  const permissions = [
    'CREATE_USER',
    'UPDATE_USER',
    'DELETE_USER',
    'VIEW_USER',
    'CREATE_POST',
    'UPDATE_POST',
    'DELETE_POST',
    'VIEW_POST',
  ];

  const permissionMap: Record<string, any> = {};

  for (const name of permissions) {
    permissionMap[name] = await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Roles
  const roles = [
    {
      name: 'ADMIN',
      permissions: ['CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'VIEW_USER'],
    },
    {
      name: 'EDITOR',
      permissions: ['UPDATE_USER', 'VIEW_USER'],
    },
    {
      name: 'VIEWER',
      permissions: ['VIEW_USER'],
    },
  ];

  for (const roleData of roles) {
    await prisma.role.upsert({
      where: { name: roleData.name },
      update: {
        permissions: {
          set: [], // Clear existing
          connect: roleData.permissions.map((p) => ({ id: permissionMap[p].id })),
        },
      },
      create: {
        name: roleData.name,
        permissions: {
          connect: roleData.permissions.map((p) => ({ id: permissionMap[p].id })),
        },
      },
    });
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
