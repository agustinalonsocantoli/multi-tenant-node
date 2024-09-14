import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            tenant?: string;
        }
    }
}

export const RequestTenant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { tenant } = req.params;

    if (!tenant) return res.badRequest();

    req.tenant = tenant;
    next();
}