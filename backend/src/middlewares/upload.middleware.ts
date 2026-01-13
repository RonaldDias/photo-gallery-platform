import multer, { Multer } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `photo-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Formato de arquivo inválido. Apenas JPG, JPEG e PNG são permitidos"
      )
    );
  }
};

const maxSize = parseInt(process.env.MAX_FILE_SIZE || "10485760");

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSize,
  },
});
