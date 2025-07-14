import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateAccessToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const checkToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return false;
  }
};
