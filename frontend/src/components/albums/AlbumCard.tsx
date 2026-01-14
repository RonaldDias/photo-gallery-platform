import type { Album } from "../../types/album.types";

interface AlbumCardProps {
  album: Album;
  onView: (album: Album) => void;
  onEdit: (album: Album) => void;
  onDelete: (album: Album) => void;
}

export const AlbumCard = ({
  album,
  onView,
  onEdit,
  onDelete,
}: AlbumCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {album.title}
      </h3>

      {album.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{album.description}</p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onView(album)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Visualizar
        </button>

        <button
          onClick={() => onEdit(album)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(album)}
          className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
        >
          Deletar
        </button>
      </div>
    </div>
  );
};
