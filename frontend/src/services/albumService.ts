import type { Album, AlbumFormData } from "../types/album.types";
import api from "./api";

export const albumService = {
  getAll: async (): Promise<Album[]> => {
    const response = await api.get("/albuns");
    return response.data;
  },

  getById: async (id: string): Promise<Album> => {
    const response = await api.get(`/albuns/${id}`);
    return response.data;
  },

  create: async (data: AlbumFormData): Promise<Album> => {
    const response = await api.post("/albuns", data);
    return response.data;
  },

  update: async (id: string, data: AlbumFormData): Promise<Album> => {
    const response = await api.put(`/albuns/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/albuns/${id}`);
  },
};
