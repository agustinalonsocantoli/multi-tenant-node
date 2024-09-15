import { z, ZodError } from 'zod';

type ValidationResult<T> = {
    data?: T;
    error?: {
        message: string;
        details: z.ZodIssue[];
    };
};

export default async function Validate<T>(schema: z.ZodSchema<T>, data: any): Promise<ValidationResult<T>> {
    try {
        const validatedData = schema.parse(data);

        return { data: validatedData };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                error: {
                    message: "Validation error",
                    details: error.errors,
                },
            };
        }
        throw error;
    }
}
