import Joi from "joi";
import { CustomError } from "../helper/CustomError";

export class Validations {
  static async LoginAdminValidation(data: any) {
    return await Joi.object({
      fullName: Joi.string().required().error(new CustomError("Name is invalid", 400)),
      email: Joi.string().required().email().messages({
        "string.base": "Username should be string",
        "string.email": "Username should be email",
      }),
      password: Joi.string().min(6).alphanum().required().error(new CustomError("Password is invalid!", 400)),
    }).validateAsync(data);
  }
}
