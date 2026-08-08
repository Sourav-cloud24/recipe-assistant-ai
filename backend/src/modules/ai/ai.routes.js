import {Router} from "express";
import { generateRecipeController } from "./ai.controller.js"; 

const router = Router();

router.post("/generate", generateRecipeController)

export default router;