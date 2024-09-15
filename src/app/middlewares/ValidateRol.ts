import { Request, Response, NextFunction } from 'express';
import SuperUser from '../models/SuperUser';
import { RolType } from '../enums/RolType';
import { ModelSchema } from '@/database/migrations';

export const ValidateRol = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = request;

        const superUser = await SuperUser.findByPk(userId);
        if (superUser) return next();

        const { User } = ModelSchema(request.tenant!);
        const user = await User.findByPk(userId);

        if (user?.rol_id !== RolType.ADMIN) return response.unauthorized();

        next();
    } catch (error) {
        console.error(error);
        return response.internalServerError();
    }
}