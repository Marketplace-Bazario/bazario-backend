import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { compareHashPassword } from "../helper/bcrypt";
import { User } from "../models/user.model";
import { checkToken, generateAccessToken, generateRefreshToken } from "../helper/jwt";
import { Validations } from "../validation/user.validation";

export const UserController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = await Validations.LoginValidation(req?.body);
      const userIsExists = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });
      if (!userIsExists) {
        throw new CustomError("User does not exist with this email: " + email, 400);
      }

      const isEqual = compareHashPassword(password, userIsExists?.password);
      if (!isEqual) {
        throw new CustomError("Password is incorrect!", 400);
      }

      const targetUser = await User.findOne({
        where: { email },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });

      res.status(200).json({
        ok: true,
        massege: "Login successfully.",
        user: targetUser,
        accessToken: generateAccessToken({
          userId: userIsExists?.id,
        }),
        refreshToken: generateRefreshToken({
          userId: userIsExists?.id,
        }),
      });
    } catch (error) {
      next(error);
    }
  },
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req?.userId;
      const targetUser = await User.findOne({
        where: {
          id: userId,
        },
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        ok: true,
        user: targetUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new CustomError("Refresh token not found!", 401);
      }

      const isValid = checkToken(refreshToken);
      if (!isValid) {
        throw new CustomError("Refresh token is invalid!", 401);
      }

      const targetUser = await User.findOne({
        where: {
          // @ts-ignore
          id: isValid?.userId,
        },
        raw: true,
      });
      if (!targetUser) {
        throw new CustomError("User not found with this token!", 401);
      }

      res.status(200).json({
        ok: true,
        accessToken: generateAccessToken({
          userId: targetUser?.id,
        }),
      });
    } catch (error) {
      next(error);
    }
  },
  async google(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenResponse } = req.body;
      if (!tokenResponse) {
        throw new CustomError("Token Response not found!", 401);
      }

      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse}`,
        },
      });

      if (!response.ok) {
        throw new CustomError("Failed to fetch user info from Google", 401);
      }

      const userInfo = await response.json();

      const targetUser = await User.findOne({
        where: {
          google_id: userInfo?.sub,
        },
      });
      if (!targetUser) {
        const newUser = await User.create({
          name: "userInfo.name",
          username: "userInfo.email",
          google_id: userInfo?.sub,
        });

        return res.status(200).json({
          ok: true,
          accessToken: generateAccessToken({
            userId: newUser?.id,
          }),
        });
      }

      res.status(200).json({
        ok: true,
        accessToken: generateAccessToken({
          userId: targetUser?.id,
        }),
      });
    } catch (error) {
      next(error);
    }
  },
};
