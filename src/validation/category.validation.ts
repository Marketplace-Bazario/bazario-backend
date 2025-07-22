import Joi from "joi";

export class CategoryValidations {
    static async CreateCategoryValidation(data: any) {
        return await Joi.object({
            name: Joi.string().required().messages({
                "string.base": "Name should be a stringified object",
                "any.required": "Name is required",
                "any.invalid": "Name must be a valid JSON object string",
            }),
            description: Joi.string().optional().messages({
                "string.base": "Description should be a stringified object",
                "any.invalid": "Description must be a valid JSON object string",
            }),
            isActive: Joi.boolean().optional().messages({
                "boolean.base": "isActive should be a boolean",
            }),
            sortOrder: Joi.number().optional().messages({
                "number.base": "sortOrder should be a number",
            }),
        }).validateAsync(data);
    }


    static async UpdateCategoryValidation(data: any) {
        return await Joi.object({
            name: Joi.string().required().messages({
                "string.base": "Name should be a stringified object",
                "any.required": "Name is required",
                "any.invalid": "Name must be a valid JSON object string",
            }),
            description: Joi.string().optional().messages({
                "string.base": "Description should be a stringified object",
                "any.invalid": "Description must be a valid JSON object string",
            }),
            isActive: Joi.boolean().optional().messages({
                "boolean.base": "isActive should be a boolean",
            }),
            sortOrder: Joi.number().optional().messages({
                "number.base": "sortOrder should be a number",
            }),
        }).validateAsync(data);
    }
}
