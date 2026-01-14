import api from "./api";
import { type Photo } from "../types/photo.types";

export const photoService = {
  uploadPhotos: async (albumId: string, files: File[]): Promise<Photo[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("fotos", file);
    });

    const response = await api.post(`/albuns/${albumId}/fotos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getPhotosByAlbum: async (albumId: string): Promise<Photo[]> => {
    const response = await api.get(`/albuns/${albumId}/fotos`);
    return response.data;
  },

  deletePhoto: async (photoId: string): Promise<void> => {
    await api.delete(`/fotos/${photoId}`);
  },
};
