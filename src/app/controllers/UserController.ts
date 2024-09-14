import { Request, Response } from 'express';
import { UserModel } from '../models/Schemas/User';

class UsersController {
    public async index(request: Request, response: Response) {
        try {
            const User = UserModel(request.tenant!);

            const users = await User.findAll();

            response.ok(users);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async show(request: Request, response: Response) {
        response.ok({ data: 'show' });
    }

    public async store(request: Request, response: Response) {
        try {
            const { name, last_name, email, password, rol_id } = request.body;
            const User = UserModel(request.tenant!);

            const user = await User.create({
                name,
                last_name,
                email,
                password,
                rol_id: rol_id ?? null
            });

            response.created(user);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async update(request: Request, response: Response) {
        response.ok({ data: 'update' });
    }

    public async destroy(request: Request, response: Response) {
        response.ok({ data: 'delete' });
    }
}

export default new UsersController();