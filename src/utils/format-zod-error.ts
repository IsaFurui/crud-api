import { ZodError } from "zod";

interface ValidationErrorResponse {
    status: false;
    msg: string;
    code: number;
    errors: Array<{
        field: string;
        message: string;
    }>;
}

export function formatZodError(error: ZodError): ValidationErrorResponse {
    return {
        status: false,
        msg: "Validation error",
        code: 400,
        errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        })),
    };
};