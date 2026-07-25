import { Router } from "express";
import * as controller from "../controllers/tradeController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router(); router.use(protect); router.post("/buy", controller.buy); router.post("/sell", controller.sell); router.get("/history", controller.history); router.get("/summary", controller.summary); export default router;
