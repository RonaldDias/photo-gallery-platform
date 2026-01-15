import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import albumsRoutes from "./routes/albums.routes";
import photosRoutes from "./routes/photos.routes";
import photosStandaloneRoutes from "./routes/photos.standalone.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor rodando!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/albuns", albumsRoutes);
app.use("/api/albuns", photosRoutes);
app.use("/api/fotos", photosStandaloneRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
