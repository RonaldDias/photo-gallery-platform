import { type Photo } from "../../types/photo.types";
import { formatFileSize, formatDate } from "../../utils/formatters";

interface PhotoTableProps {
  photos: Photo[];
  onDelete: (photo: Photo) => void;
}

export const PhotoTable = ({ photos, onDelete }: PhotoTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Foto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tamanho
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Captura
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cor Predominante
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {photos.map((photo) => (
            <tr key={photo.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={`http://localhost:3001/uploads/${photo.filename}`}
                  alt={photo.title}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                  {photo.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatFileSize(photo.size)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(photo.captureDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {photo.dominantColor ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: photo.dominantColor }}
                    />
                    <span className="text-xs text-gray-600 font-mono">
                      {photo.dominantColor}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button
                  onClick={() => onDelete(photo)}
                  className="text-red-600 hover:text-red-900 font-medium"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
