import { Router } from "express";
import * as controller from "../controllers/marketController.js";
const router = Router(); router.get("/top", controller.top); router.get("/search/:query", controller.search); router.get("/coin/:id", controller.coin); router.get("/chart/:id", controller.chart); router.get("/live/:symbol", controller.live); export default router;
