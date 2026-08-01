import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Access token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 401,
      message: "Invalid or expired token.",
    });
  }
};
