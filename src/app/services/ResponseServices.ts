import { Response } from 'express';

export default class ResponseServices {
    static ok(
        res: Response,
        body: any = {}
    ) {
        return res.status(200).json(body);
    }

    static created(
        res: Response,
        body: any = {}
    ) {
        return res.status(201).json(body);
    }

    static badRequest(
        res: Response,
        body: any = {}
    ) {
        return res.status(400).json(body);
    }

    static unauthorized(
        res: Response,
        body: any = {}
    ) {
        return res.status(401).json(body);
    }

    static paymentRequired(
        res: Response,
        body: any = {}
    ) {
        return res.status(402).json(body);
    }

    static notFound(
        res: Response,
        body: any = {}
    ) {
        return res.status(404).json(body);
    }

    static methodNotAllowed(
        res: Response,
        body: any = {}
    ) {
        return res.status(405).json(body);
    }

    static tooManyRequests(
        res: Response,
        body: any = {}
    ) {
        return res.status(429).json(body);
    }

    static internalServerError(
        res: Response,
        body: any = { error: 'Internal Server Error' }
    ) {
        return res.status(500).json(body);
    }

    static badGateway(
        res: Response,
        body: any = {}
    ) {
        return res.status(502).json(body);
    }

    static gatewayTimeout(
        res: Response,
        body: any = {}
    ) {
        return res.status(504).json(body);
    }
}