import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as albumsController from "../controllers/albums.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", albumsController.listAlbums);
router.post("/", albumsController.createAlbum);
router.get("/:id", albumsController.getAlbum);
router.put("/:id", albumsController.updateAlbum);
router.delete("/:id", albumsController.deleteAlbum);

export default router;
