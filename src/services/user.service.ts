import { UserRepository } from '../repositories/user.repository';
import { auditService } from './audit.service';
import { AuditAction } from '../utils/audit-action';
import { RoleRepository } from '../repositories/rbac.repository';

export class UserService {
  private userRepository: UserRepository;
  private roleRepository: RoleRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
  }

  async create(data: { name: string; email: string }) {
    const user = await this.userRepository.create(data);

    await auditService.record({
      entity: 'User',
      entityId: user.id,
      action: AuditAction.CREATE,
      oldData: null,
      newData: { name: user.name, email: user.email },
      performedBy: 'System',
    });

    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(id: string, data: { name?: string; email?: string }) {
    const oldUser = await this.userRepository.findById(id);
    if (!oldUser) throw new Error('User not found');

    const updatedUser = await this.userRepository.update(id, data);

    await auditService.record({
      entity: 'User',
      entityId: id,
      action: AuditAction.UPDATE,
      oldData: { name: oldUser.name, email: oldUser.email },
      newData: { name: updatedUser.name, email: updatedUser.email },
      performedBy: 'System',
    });

    return updatedUser;
  }

  async delete(id: string) {
    const oldUser = await this.userRepository.findById(id);
    if (!oldUser) throw new Error('User not found');

    await this.userRepository.delete(id);

    await auditService.record({
      entity: 'User',
      entityId: id,
      action: AuditAction.DELETE,
      oldData: { name: oldUser.name, email: oldUser.email },
      newData: null,
      performedBy: 'System',
    });

    return { message: 'User deleted successfully' };
  }

  async assignRole(userId: string, roleName: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const role = await this.roleRepository.findByName(roleName);
    if (!role) throw new Error('Role not found');

    return await this.userRepository.assignRole(userId, role.id);
  }

  async getUserPermissions(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const permissions = new Set<string>();
    user.roles.forEach(role => {
      role.permissions.forEach(permission => {
        permissions.add(permission.name);
      });
    });

    return Array.from(permissions);
  }

  async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permissionName);
  }
}
