import { genSaltSync, hashSync, compareSync } from "bcrypt";

function createHash(password) {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  return hashPassword;
}

function verifyHash(password, mongoPassword) {
  const result = compareSync(password, mongoPassword);
  return result;
}

export { createHash, verifyHash };
