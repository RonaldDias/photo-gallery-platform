import fs from "fs";
import path from "path";
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as photosService from "../services/photos.service";
import * as albumsService from "../services/albums.service";
import * as imageProcessingService from "../services/imageProcessing.service";

export const uploadPhoto = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const albumId = req.params.albumId as string;
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhum arquivo enviado" });
    }

    if (!title) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const album = await albumsService.getAlbumById(albumId, userId);

    if (!album) {
      return res.status(404).json({ erro: "Álbum não encontrado" });
    }

    const dominantColor = await imageProcessingService.extractDominantColor(
      req.file.path
    );
    const acquisitionDate = await imageProcessingService.extractExifDate(
      req.file.path
    );

    const photoData = {
      title,
      description,
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      acquisitionDate,
      dominantColor,
      albumId,
    };

    const photo = await photosService.createPhoto(photoData);

    return res.status(201).json(photo);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const listPhotos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const albumId = req.params.albumId as string;

    await albumsService.getAlbumById(albumId, userId);

    const photos = await photosService.listPhotosByAlbum(albumId);

    return res.status(200).json(photos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const deletePhoto = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const photoId = req.params.id as string;

    const result = await photosService.deletePhoto(photoId, userId);

    if (fs.existsSync(result.filepath)) {
      fs.unlinkSync(result.filepath);
    }

    return res.status(200).json({ message: "Foto deletada com sucesso!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ erro: error.message });
    }

    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};
