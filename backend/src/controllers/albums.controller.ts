import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as albumsService from "../services/albums.service";

export const listAlbums = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const albums = await albumsService.listUserAlbums(userId);
    return res.status(200).json(albums);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const getAlbum = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;
    const album = await albumsService.getAlbumById(id, userId);
    return res.status(200).json(album);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const createAlbum = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const album = await albumsService.createAlbum(userId, title, description);
    return res.status(201).json(album);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const updateAlbum = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const album = await albumsService.updateAlbum(
      id,
      userId,
      title,
      description
    );
    return res.status(200).json(album);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const deleteAlbum = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;
    const result = await albumsService.deleteAlbum(id, userId);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};
