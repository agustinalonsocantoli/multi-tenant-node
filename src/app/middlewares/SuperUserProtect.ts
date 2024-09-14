import { Request, Response, NextFunction } from "express";
import SuperUser from "../models/SuperUser";

export const SuperUserProtect = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = request;

        const superUser = await SuperUser.findByPk(userId);

        if (!superUser) return response.unauthorized();

        next();
    } catch (error) {
        console.error(error);
        return response.internalServerError();
    }
}