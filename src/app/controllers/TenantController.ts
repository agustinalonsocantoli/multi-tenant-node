import { Request, Response } from 'express';
import Tenant from '../models/Tenant';
import schemaInit from '@/config/schema';

class TenantController {
    async index(request: Request, response: Response) {
        response.ok({ data: 'index' });
    }

    async show(request: Request, response: Response) {
        response.ok({ data: 'show' });
    }

    async store(request: Request, response: Response) {
        try {
            const { name, slug } = request.body;

            const createSchema = await schemaInit(slug);

            if (!createSchema) return response.badRequest();

            const tenant = await Tenant.create({ name, slug });

            response.ok({
                data: tenant,
                message: createSchema
            });

        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    async update(request: Request, response: Response) {
        response.ok({ data: 'update' });
    }

    async destroy(request: Request, response: Response) {
        response.ok({ data: 'delete' });
    }
}

export default new TenantController();