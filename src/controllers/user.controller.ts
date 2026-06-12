import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findById(req.params.id as string);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.update(req.params.id as string, req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.delete(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  assignRole = async (req: Request, res: Response) => {
    try {
      const { roleName } = req.body;
      const user = await this.userService.assignRole(req.params.id as string, roleName);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getPermissions = async (req: Request, res: Response) => {
    try {
      const permissions = await this.userService.getUserPermissions(req.params.id as string);
      res.json(permissions);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}
