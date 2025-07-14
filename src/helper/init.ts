import { User } from "../models/user.model";
import { getHashPassword } from "./bcrypt";

export const initAdmin = async () => {
  const users = await User.findAll();

  if (!users.length) {
    const hashedPass = getHashPassword("admin");
    const newAdmin = await User.create({
      fullName: "Admin",
      email: "admin@gmail.com",
      password: hashedPass,
      role: "admin",
    });
    console.log(newAdmin);
  }
};
