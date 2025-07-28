import Joi from 'joi';

export class ProductValidations {
  static async ProductValidation(data: any) {
    return await Joi.object({
      name: Joi.string().required().messages({
        'string.base': 'Name should be a stringified object',
        'any.required': 'Name is required',
        'any.invalid': 'Name must be a valid JSON object string',
      }),
      description: Joi.string().optional().messages({
        'string.base': 'Description should be a stringified object',
        'any.invalid': 'Description must be a valid JSON object string',
      }),
      price: Joi.number().required().messages({
        'number.base': 'Price should be a number',
        'any.required': 'Price is required',
        'any.invalid': 'Price must be a valid number',
      }),
      stock: Joi.number().required().messages({
        'number.base': 'Stock should be a number',
        'any.required': 'Stock is required',
        'any.invalid': 'Stock must be a valid number',
      }),
      minStock: Joi.number().optional().messages({
        'number.base': 'MinStock should be a number',
        'any.invalid': 'MinStock must be a valid number',
      }),
      isActive: Joi.boolean().optional().messages({
        'boolean.base': 'isActive should be a boolean',
      }),
      images: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).optional(),
    }).validateAsync(data);
  }
}
