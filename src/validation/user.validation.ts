import Joi from "joi";
import { CustomError } from "../helper/CustomError";

export class Validations {
  static async LoginValidation(data: any) {
    return await Joi.object({
      email: Joi.string().required().email().messages({
        "string.base": "Email should be a string",
        "string.email": "Email should be a valid email address",
        "any.required": "Email is required",
      }),
      password: Joi.string().min(5).alphanum().required().messages({
        "string.base": "Password should be a string",
        "string.alphanum": "Password should only contain alpha-numeric characters",
        "string.min": "Password should be at least 6 characters",
        "any.required": "Password is required",
      }),
    }).validateAsync(data);
  }
}
