import type z from "zod"

export const validateSchema = (schema: z.ZodObject, data: any) =>{
    const validate = schema.safeParse(data);

    if (validate && !validate.success) {
        const newError:Record<string,string> = {};
        validate.error.issues.forEach(issue => {
            const field = issue.path[0] as string;
            newError[field] = issue.message;
        })
        return newError;
    }
    return {}
}