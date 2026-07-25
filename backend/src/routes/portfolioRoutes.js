import { Router } from "express";
import * as controller from "../controllers/portfolioController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router(); router.use(protect); router.get("/", controller.portfolio); router.get("/holdings", controller.holdings); router.get("/performance", controller.performance); router.post("/reset", controller.reset); export default router;
