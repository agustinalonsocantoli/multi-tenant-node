import { Request, Response } from "express";
import { ModelSchema } from "@/database/migrations";
import Validate from "../services/ValidateService";
import { CreateAccount, CreateAccountValidator } from "../validators/CreateAccountValidator";
import { UpdateAccount, UpdateAccountValidator } from "../validators/UpdateAccountValidator";

class AccountController {
    public async index(request: Request, response: Response) {
        try {
            const { Account, User } = ModelSchema(request.tenant!);

            const accounts = await Account.query().preload(User).exec();

            response.ok(accounts);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const { Account } = ModelSchema(request.tenant!);

            const account = await Account.query().findById(id);

            response.ok(account);
        } catch (error) {
            console.log(error)
            response.badRequest
        }
    }

    public async store(request: Request, response: Response) {
        try {
            const validate = await Validate<CreateAccount>(CreateAccountValidator, request.body);

            if (validate.error) {
                return response.badRequest(validate.error);
            }

            const { Account } = ModelSchema(request.tenant!);

            const account = await Account.create(validate.data);

            response.created(account);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const validate = await Validate<UpdateAccount>(UpdateAccountValidator, request.body);

            if (validate.error) {
                return response.badRequest(validate.error);
            }

            const { Account } = ModelSchema(request.tenant!);

            const account = await Account.query().findById(id);

            if (!account) return response.notFound();

            await account.update(validate.data!);

            response.ok(account);
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }

    public async destroy(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const { Account } = ModelSchema(request.tenant!);

            const account = await Account.query().findById(id);

            if (!account) return response.notFound();

            await account.destroy();

            response.ok({
                message: 'Account deleted'
            });
        } catch (error) {
            console.log(error)
            response.badRequest();
        }
    }
}

export default new AccountController();