import { Response } from 'express';

export default class ResponseServices {
    static ok(
        res: Response,
        body: any = { message: 'Response OK' }
    ) {
        return res.status(200).json(body);
    }

    static created(
        res: Response,
        body: any = { message: 'Created' }
    ) {
        return res.status(201).json(body);
    }

    static badRequest(
        res: Response,
        body: any = { error: 'Bad Request' }
    ) {
        return res.status(400).json(body);
    }

    static unauthorized(
        res: Response,
        body: any = { error: 'Unauthorized' }
    ) {
        return res.status(401).json(body);
    }

    static paymentRequired(
        res: Response,
        body: any = { error: 'Payment Required' }
    ) {
        return res.status(402).json(body);
    }

    static notFound(
        res: Response,
        body: any = { error: 'Not Found' }
    ) {
        return res.status(404).json(body);
    }

    static methodNotAllowed(
        res: Response,
        body: any = { error: 'Method Not Allowed' }
    ) {
        return res.status(405).json(body);
    }

    static tooManyRequests(
        res: Response,
        body: any = { error: 'Too Many Requests' }
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
        body: any = { error: 'Bad Gateway' }
    ) {
        return res.status(502).json(body);
    }

    static gatewayTimeout(
        res: Response,
        body: any = { error: 'Gateway Timeout' }
    ) {
        return res.status(504).json(body);
    }
}