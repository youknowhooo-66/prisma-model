import { Request, Response } from 'express';
import { AuditLogRepository } from '../repositories/audit-log.repository';

export class AuditLogController {
  private auditLogRepository: AuditLogRepository;

  constructor() {
    this.auditLogRepository = new AuditLogRepository();
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const logs = await this.auditLogRepository.findAll();
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
