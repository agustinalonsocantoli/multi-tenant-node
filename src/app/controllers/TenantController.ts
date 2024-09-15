import { Request, Response } from 'express';
import Tenant from '../models/Tenant';
import schemaInit from '@/config/schema';
import { CreateTenant, CreateTenantValidator } from '../validators/CreateTenantValidator';
import Validate from '../services/ValidateService';

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
            const validate = await Validate<CreateTenant>(CreateTenantValidator, request.body);

            if (validate.error) {
                return response.badRequest(validate.error);
            }

            const createSchema = await schemaInit(validate?.data?.slug!);

            if (!createSchema) return response.badRequest();

            const tenant = await Tenant.create(validate.data);

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