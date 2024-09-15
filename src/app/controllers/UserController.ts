import { ModelSchema } from '@/database/migrations';
import { Request, Response } from 'express';
import Validate from '../services/ValidateService';
import { CreateUser, CreateUserValidator } from '../validators/CreateUserValidator';

class UsersController {
    public async index(request: Request, response: Response) {
        try {
            const { User } = ModelSchema(request.tenant!);

            const users = await User.query().exec();

            response.ok(users);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const { User } = ModelSchema(request.tenant!);

            const user = await User.query().findById(id);

            response.ok(user);
        } catch (error) {
            console.log(error)
            response.badRequest
        }
    }

    public async store(request: Request, response: Response) {
        try {
            const validate = await Validate<CreateUser>(CreateUserValidator, request.body);

            if (validate.error) {
                return response.badRequest(validate.error);
            }

            const { User } = ModelSchema(request.tenant!);

            const user = await User.create(validate.data);

            response.created(user);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }
}

export default new UsersController();