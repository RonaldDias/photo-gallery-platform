import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreatePhotoData {
  title: string;
  description?: string;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  acquisitionDate: Date;
  dominantColor: string;
  albumId: string;
}

export const createPhoto = async (data: CreatePhotoData) => {
  return await prisma.photo.create({
    data,
  });
};

export const listPhotosByAlbum = async (albumId: string) => {
  return await prisma.photo.findMany({
    where: { albumId },
    orderBy: { acquisitionDate: "desc" },
  });
};

export const deletePhoto = async (photoId: string, userId: string) => {
  const photo = await prisma.photo.findFirst({
    where: {
      id: photoId,
    },
    include: {
      album: true,
    },
  });

  if (!photo) {
    throw new Error("Foto não encontrada");
  }

  if (photo.album.userId !== userId) {
    throw new Error("Você não tem permissão para deletar esta foto");
  }

  await prisma.photo.delete({
    where: { id: photoId },
  });

  return { filepath: photo.filepath };
};
