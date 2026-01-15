import { z } from "zod";

export interface Photo {
  id: string;
  filename: string;
  title: string;
  description: string | null;
  mimeType: string;
  size: number;
  dominantColor: string | null;
  captureDate: string | null;
  albumId: string;
  createdAt: string;
}

export const photoUploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, { message: "Selecione pelo menos uma foto" })
    .refine((files) => files.every((file) => file.type.startsWith("image/")), {
      message: "Apenas imagens são permitidas",
    })
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024), // 10MB
      { message: "Cada imagem deve ter no máximo 10MB" }
    ),
});

export type PhotoUploadData = z.infer<typeof photoUploadSchema>;
