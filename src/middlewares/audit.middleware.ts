import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para auditoria básica de requisições.
 * Registra o método, URL e tempo de execução no console.
 * Complementa a auditoria de dados realizada no Service Layer.
 */
export const requestAuditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[AUDIT] ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
  });

  next();
};
