import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import * as photosController from "../controllers/photos.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/:albumId/fotos",
  upload.single("photo"),
  photosController.uploadPhoto
);
router.get("/:albumId/fotos", photosController.listPhotos);

export default router;
