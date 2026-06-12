import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { AuditLogController } from '../controllers/audit-log.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();
const auditLogController = new AuditLogController();

// User Routes
router.post('/users', userController.create);
router.get('/users', authorize('VIEW_USER'), userController.findAll);
router.get('/users/:id', authorize('VIEW_USER'), userController.findById);
router.put('/users/:id', authorize('UPDATE_USER'), userController.update);
router.delete('/users/:id', authorize('DELETE_USER'), userController.delete);

// RBAC Routes
router.post('/users/:id/roles', userController.assignRole);
router.get('/users/:id/permissions', userController.getPermissions);

// Audit Routes
router.get('/audit-logs', auditLogController.findAll);

export default router;
