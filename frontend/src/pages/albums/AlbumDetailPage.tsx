import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlbumForm } from "../../components/albums/AlbumForm";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { Modal } from "../../components/common/Modal";
import { PhotoUpload } from "../../components/photos/PhotoUpload";
import { albumService } from "../../services/albumService";
import { photoService } from "../../services/photoService";
import { type Album, type AlbumFormData } from "../../types/album.types";
import { type Photo } from "../../types/photo.types";
import { PhotoGrid } from "../../components/photos/PhotoGrid";
import { PhotoTable } from "../../components/photos/PhotoTable";

export const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">(() => {
    return (
      (localStorage.getItem("photoViewMode") as "grid" | "table") || "grid"
    );
  });
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  const [isDeletePhotoModalOpen, setIsDeletePhotoModalOpen] = useState(false);
  const [photoToDeleteName, setPhotoToDeleteName] = useState("");

  useEffect(() => {
    if (id) {
      loadAlbum();
      loadPhotos();
    }
  }, [id]);

  const loadAlbum = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const data = await albumService.getById(id);
      setAlbum(data);
    } catch (error) {
      console.error("Erro ao carregar álbum:", error);
      navigate("/albuns");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPhotos = async () => {
    if (!id) return;

    try {
      const data = await photoService.getPhotosByAlbum(id);
      setPhotos(data);
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
    } finally {
    }
  };

  const handleEdit = async (data: AlbumFormData) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await albumService.update(id, data);
      await loadAlbum();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar álbum:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await albumService.delete(id);
      navigate("/albuns");
    } catch (error) {
      console.error("Erro ao deletar álbum:", error);
      setIsSubmitting(false);
    }
  };

  const openDeletePhotoModal = (photo: Photo) => {
    setPhotoToDelete(photo);
    setPhotoToDeleteName(photo.title);
    setIsDeletePhotoModalOpen(true);
  };

  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;

    try {
      setIsSubmitting(true);
      await photoService.deletePhoto(photoToDelete.id);
      await loadPhotos();
      setIsDeletePhotoModalOpen(false);
      setPhotoToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar foto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewModeChange = (mode: "grid" | "table") => {
    setViewMode(mode);
    localStorage.setItem("photoViewMode", mode);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Carregando álbum...</div>
      </div>
    );
  }

  if (!album) {
    return null;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={() => navigate("/albuns")}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {album.title}
              </h1>
              {album.description && (
                <p className="text-gray-600">{album.description}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Editar
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fotos</h2>

          <PhotoUpload albumId={id!} onUploadSuccess={loadPhotos} />

          {photos.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {photos.length} foto(s)
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewModeChange("grid")}
                    className={`px-4 py-2 rounded-md font-medium ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Grade
                  </button>
                  <button
                    onClick={() => handleViewModeChange("table")}
                    className={`px-4 py-2 rounded-md font-medium ${
                      viewMode === "table"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Tabela
                  </button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <PhotoGrid photos={photos} onDelete={openDeletePhotoModal} />
              ) : (
                <PhotoTable photos={photos} onDelete={openDeletePhotoModal} />
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Álbum"
      >
        <AlbumForm
          album={album}
          onSubmit={handleEdit}
          onCancel={() => setIsEditModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Deletar Álbum"
        message={`Tem certeza que deseja deletar o álbum "${album.title}"? Esta ação não pode ser desfeita.`}
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={isDeletePhotoModalOpen}
        onClose={() => {
          setIsDeletePhotoModalOpen(false);
          setPhotoToDelete(null);
        }}
        onConfirm={handleDeletePhoto}
        title="Deletar Foto"
        message={`Tem certeza que deseja deletar a foto "${photoToDeleteName}"? Esta ação não pode ser desfeita.`}
        isLoading={isSubmitting}
      />
    </div>
  );
};
