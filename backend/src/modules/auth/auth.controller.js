import { errorResponse, successResponse } from "../../utils/response.js";
import { loginUser, registerUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    console.log("Result:", result);

    return successResponse(res, {
      statusCode: 200,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 401,
      message: error.message,
    });
  }
};
