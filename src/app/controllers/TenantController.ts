import { Request, Response } from 'express';
import Tenant from '../models/Tenant';
import schemaInit from '@/config/schema';

class TenantController {
    public async index(request: Request, response: Response) {
        try {
            const tenants = await Tenant.query().exec();

            response.ok({
                data: tenants
            });
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const tenant = await Tenant.query().findById(id);

            response.ok({
                data: tenant
            });
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async store(request: Request, response: Response) {
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
}

export default new TenantController();