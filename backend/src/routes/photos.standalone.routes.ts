import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as photosController from "../controllers/photos.controller";

const router = Router();

router.use(authMiddleware);

router.delete("/:id", photosController.deletePhoto);

export default router;
