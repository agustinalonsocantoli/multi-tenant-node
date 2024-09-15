import { z } from 'zod';

export const CreateAccountValidator = z.object({
    number: z.string().min(7, { message: 'Number is required' }),
    amount: z.number().min(0, { message: 'Amount is required' }),
    max_output: z.number().min(0, { message: 'Max output is required' }),
    user_id: z.string().min(36, { message: 'User id is required' }),
});

export type CreateAccount = z.infer<typeof CreateAccountValidator>;
