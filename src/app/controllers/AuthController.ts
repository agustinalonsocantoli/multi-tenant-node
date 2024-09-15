import { Response, Request } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import SuperUser from '../models/SuperUser';
import { ModelSchema } from '@/database/migrations';

class AuthController {
    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) return response.badRequest();

            const { User, Rol } = ModelSchema(request.tenant!);

            let user = await User.query().whereILike('email', email).first();

            if (!user) return response.unauthorized({ message: 'Invalid email or password' });

            const isPasswordValid = await argon2.verify(user.password, password);

            if (!isPasswordValid) return response.unauthorized({ message: 'Invalid email or password' });


            user = await User.query().exclude(['password']).preload(Rol).findById(user.id);

            const token = jwt.sign({ id: user?.id }, env.jwtSecret, { expiresIn: '5d' });

            response.ok({
                data: {
                    user,
                    token
                }
            });
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async loginSuperUser(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) return response.badRequest();

            let superUser = await SuperUser.query().whereILike('email', email).first();

            if (!superUser) return response.unauthorized({ message: 'Invalid email or password' });

            const isPasswordValid = await argon2.verify(superUser.password, password);

            if (!isPasswordValid) return response.unauthorized({ message: 'Invalid email or password' });

            superUser = await SuperUser.query().exclude(['password']).findById(superUser.id);

            const token = jwt.sign({ id: superUser?.id }, env.jwtSecret, { expiresIn: '5d' });

            response.ok({
                data: {
                    superUser,
                    token
                }
            });
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }
}

export default new AuthController();