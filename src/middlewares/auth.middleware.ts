import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const authorize = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // In a real app, userId would come from a JWT token in req.user
      // For this exercise, we'll expect it in the headers or as a query param for testing
      const userId = req.headers['x-user-id'] as string;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing in headers' });
      }

      const hasPermission = await userService.hasPermission(userId, permission);

      if (!hasPermission) {
        return res.status(403).json({ message: `Forbidden: Missing permission ${permission}` });
      }

      next();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};
