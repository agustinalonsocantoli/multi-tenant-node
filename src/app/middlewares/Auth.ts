import { env } from '@/config/env';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const Auth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const header = request.header('Authorization');
        const token = header?.replace('Bearer ', '');

        if (!token) return response.unauthorized();

        const decoded = jwt.verify(token, env.jwtSecret) as { id: string };

        request.userId = decoded.id;
        next();
        
    } catch (error) {
        console.error(error);
        return response.internalServerError();
    }
}