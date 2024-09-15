import { z } from 'zod';

export const CreateUserValidator = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    rol_id: z.number().optional(),
});

export type CreateUser = z.infer<typeof CreateUserValidator>;
