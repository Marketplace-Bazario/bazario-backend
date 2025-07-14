import bcrypt from "bcrypt";

export const getHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);
  return hashedPass;
};

export const compareHashPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
