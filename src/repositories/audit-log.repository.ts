import prisma from '../database/prisma';
import { AuditAction } from '../utils/audit-action';

export class AuditLogRepository {
  async create(data: {
    entity: string;
    entityId: string;
    action: AuditAction;
    oldData?: any;
    newData?: any;
    performedBy?: string;
  }) {
    return await prisma.auditLog.create({
      data: {
        entity: data.entity,
        entityId: data.entityId,
        action: data.action,
        oldData: data.oldData ? JSON.stringify(data.oldData) : null,
        newData: data.newData ? JSON.stringify(data.newData) : null,
        performedBy: data.performedBy,
      },
    });
  }

  async findAll() {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return logs.map(log => ({
      ...log,
      oldData: log.oldData ? JSON.parse(log.oldData) : null,
      newData: log.newData ? JSON.parse(log.newData) : null,
    }));
  }
}
