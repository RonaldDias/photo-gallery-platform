import { useEffect, useState } from "react";
import type { Album, AlbumFormData } from "../../types/album.types";
import { useNavigate } from "react-router-dom";
import { albumService } from "../../services/albumService";
import { AlbumCard } from "../../components/albums/AlbumCard";
import { Modal } from "../../components/common/Modal";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { AlbumForm } from "../../components/albums/AlbumForm";
import { showError, showSuccess } from "../../utils/toast";

export const AlbumsListPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumToDeleteTitle, setAlbumToDeleteTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      setIsLoading(true);
      const data = await albumService.getAll();
      setAlbums(data);
    } catch (error) {
      console.error("Erro ao carregar álbuns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: AlbumFormData) => {
    try {
      setIsSubmitting(true);
      await albumService.create(data);
      showSuccess("Álbum criado com sucesso!");
      await loadAlbums();
      setIsCreateModalOpen(false);
    } catch (error: any) {
      console.error("Erro ao criar álbum:", error);

      const errorMessage =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        "Erro ao criar álbum";

      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: AlbumFormData) => {
    if (!selectedAlbum) return;

    try {
      setIsSubmitting(true);
      await albumService.update(selectedAlbum.id, data);
      showSuccess("Álbum atualizado com sucesso!");
      await loadAlbums();
      setIsEditModalOpen(false);
      setSelectedAlbum(null);
    } catch (error: any) {
      console.error("Erro ao editar álbum:", error);

      const errorMessage =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        "Erro ao atualizar álbum";

      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAlbum) return;

    try {
      setIsSubmitting(true);
      await albumService.delete(selectedAlbum.id);
      showSuccess("Álbum deletado com sucesso!");
      await loadAlbums();
      setIsDeleteModalOpen(false);
      setSelectedAlbum(null);
    } catch (error: any) {
      console.error("Erro ao deletar álbum:", error);

      const errorMessage =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        "Erro ao deletar álbum";

      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleView = (album: Album) => {
    navigate(`/albuns/${album.id}`);
  };

  const openEditModal = (album: Album) => {
    setSelectedAlbum(album);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (album: Album) => {
    setSelectedAlbum(album);
    setAlbumToDeleteTitle(album.title);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Carregando álbuns...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meus Álbuns</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            + Criar Novo Álbum
          </button>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Você ainda não tem álbuns criados
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Criar Primeiro Álbum
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onView={handleView}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Novo Álbum"
      >
        <AlbumForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAlbum(null);
        }}
        title="Editar Álbum"
      >
        <AlbumForm
          album={selectedAlbum || undefined}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedAlbum(null);
          }}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedAlbum(null);
        }}
        onConfirm={handleDelete}
        title="Deletar Álbum"
        message={`Tem certeza que deseja deletar o álbum "${albumToDeleteTitle}"? Esta ação não pode ser desfeita.`}
        isLoading={isSubmitting}
      />
    </div>
  );
};
