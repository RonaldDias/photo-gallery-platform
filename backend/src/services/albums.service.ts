import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listUserAlbums = async (userId: string) => {
  return await prisma.album.findMany({
    where: { userId },
    include: {
      _count: {
        select: { photos: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getAlbumById = async (albumId: string, userId: string) => {
  const album = await prisma.album.findFirst({
    where: {
      id: albumId,
      userId,
    },
    include: {
      photos: true,
    },
  });

  if (!album) {
    throw new Error("Álbum não encontrado");
  }

  return album;
};

export const createAlbum = async (
  userId: string,
  title: string,
  description?: string
) => {
  return await prisma.album.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

export const updateAlbum = async (
  albumId: string,
  userId: string,
  title: string,
  description?: string
) => {
  const album = await prisma.album.findFirst({
    where: { id: albumId, userId },
  });

  if (!album) {
    throw new Error("Álbum não encontrado");
  }

  return await prisma.album.update({
    where: { id: albumId },
    data: { title, description },
  });
};

export const deleteAlbum = async (albumId: string, userId: string) => {
  const album = await prisma.album.findFirst({
    where: { id: albumId, userId },
    include: {
      _count: {
        select: { photos: true },
      },
    },
  });

  if (!album) {
    throw new Error("ÁLbum não encontrado");
  }

  if (album._count.photos > 0) {
    throw new Error("Não é possível deletar album com fotos");
  }

  await prisma.album.delete({
    where: { id: albumId },
  });

  return { message: "Álbum deletado com sucesso!" };
};
