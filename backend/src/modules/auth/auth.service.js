import { createUser, findUserByEmail } from "./auth.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUser = async ({ fullname, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    fullname,
    email,
    passwordHash,
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Email not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    {
        userId: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email
    },
    token
  }
};
