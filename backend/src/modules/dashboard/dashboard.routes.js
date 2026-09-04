import express from "express"

import { authenticateUser } from "../../middleware/auth.middleware.js"
import { getDashboard } from "./dashboard.controller.js"

const dashboardRoutes = express.Router()

dashboardRoutes.get("/",authenticateUser, getDashboard)

export default dashboardRoutes