import { Request, Response, NextFunction } from 'express';
import ResponseServices from '../services/ResponseServices';

export const responseEnhancer = (req: Request, res: Response, next: NextFunction) => {
    res.ok = (body: any) => ResponseServices.ok(res, body)
    res.created = (body: any) => ResponseServices.created(res, body)
    res.badRequest = (body: any) => ResponseServices.badRequest(res, body)
    res.unauthorized = (body: any) => ResponseServices.unauthorized(res, body)
    res.paymentRequired = (body: any) => ResponseServices.paymentRequired(res, body)
    res.notFound = (body: any) => ResponseServices.notFound(res, body)
    res.methodNotAllowed = (body: any) => ResponseServices.methodNotAllowed(res, body)
    res.tooManyRequests = (body: any) => ResponseServices.tooManyRequests(res, body)
    res.internalServerError = (body: any) => ResponseServices.internalServerError(res, body)
    res.badGateway = (body: any) => ResponseServices.badGateway(res, body)
    res.gatewayTimeout = (body: any) => ResponseServices.gatewayTimeout(res, body)

    next();
};

declare global {
    namespace Express {
        export interface Response {
            ok: (body: any) => void;
            created: (body?: any) => void;
            badRequest: (body?: any) => void;
            unauthorized: (body?: any) => void;
            paymentRequired: (body?: any) => void;
            notFound: (body?: any) => void;
            methodNotAllowed: (body?: any) => void;
            tooManyRequests: (body?: any) => void;
            internalServerError: (body?: any) => void;
            badGateway: (body?: any) => void;
            gatewayTimeout: (body?: any) => void;
        }
    }
}