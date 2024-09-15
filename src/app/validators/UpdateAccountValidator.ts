import { z } from 'zod';

export const UpdateAccountValidator = z.object({
    amount: z.number().min(0).optional(),
    max_output: z.number().min(0).optional(),
});

export type UpdateAccount = z.infer<typeof UpdateAccountValidator>;
