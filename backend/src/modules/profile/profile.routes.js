import express from "express";
import { getProfileController } from "./profile.controller.js";
import { authenticateUser } from "../../middleware/auth.middleware.js"

const profileRoutes = express.Router();

profileRoutes.get("/", authenticateUser, getProfileController);

export default profileRoutes;