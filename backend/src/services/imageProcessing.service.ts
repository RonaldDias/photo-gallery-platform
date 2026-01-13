import sharp from "sharp";
import exifParser from "exif-parser";
import fs from "fs";

export const extractDominantColor = async (
  filepath: string
): Promise<string> => {
  try {
    const { data, info } = await sharp(filepath)
      .resize(1, 1, { fit: "cover" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const r = data[0];
    const g = data[1];
    const b = data[2];

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch (error) {
    console.error("Erro ao extrair cor predominante:", error);
    return "#000000";
  }
};

export const extractExifDate = async (filepath: string): Promise<Date> => {
  try {
    const buffer = fs.readFileSync(filepath);
    const parser = exifParser.create(buffer);
    const result = parser.parse();

    if (result.tags?.DateTimeOriginal) {
      return new Date(result.tags.DateTimeOriginal * 1000);
    }

    return new Date();
  } catch (error) {
    console.error("Erro ao extrair EXIF:", error);
    return new Date();
  }
};
