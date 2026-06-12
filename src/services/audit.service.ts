import { AuditLogRepository } from '../repositories/audit-log.repository';
import { AuditAction } from '../utils/audit-action';

export class AuditService {
  private auditLogRepository: AuditLogRepository;

  constructor() {
    this.auditLogRepository = new AuditLogRepository();
  }

  async record(params: {
    entity: string;
    entityId: string;
    action: AuditAction;
    oldData?: any;
    newData?: any;
    performedBy?: string;
  }) {
    return await this.auditLogRepository.create(params);
  }
}

export const auditService = new AuditService();
