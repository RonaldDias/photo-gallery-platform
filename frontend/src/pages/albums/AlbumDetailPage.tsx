import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { albumService } from "../../services/albumService";
import { Modal } from "../../components/common/Modal";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { AlbumForm } from "../../components/albums/AlbumForm";
import { type AlbumFormData, type Album } from "../../types/album.types";
import { PhotoUpload } from "../../components/photos/PhotoUpload";
import { photoService } from "../../services/photoService";
import { type Photo } from "../../types/photo.types";

export const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

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
      setIsLoadingPhotos(true);
      const data = await photoService.getPhotosByAlbum(id);
      setPhotos(data);
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
    } finally {
      setIsLoadingPhotos(false);
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
    <div className="min-h-screen bg-gray-50">
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

          {isLoadingPhotos ? (
            <div className="text-center py-8 text-gray-500">
              Carregando fotos...
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma foto neste álbum ainda
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={`http://localhost:3001/uploads/${photo.filename}`}
                    alt={photo.originalName}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              ))}
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
    </div>
  );
};
