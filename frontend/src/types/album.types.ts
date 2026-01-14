import { z } from "zod";

export interface Album {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    photos: number;
  };
}

export const albumSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
});

export type AlbumFormData = z.infer<typeof albumSchema>;
