import { type Photo } from "../../types/photo.types";

interface PhotoGridProps {
  photos: Photo[];
  onDelete: (photo: Photo) => void;
}

export const PhotoGrid = ({ photos, onDelete }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="relative group">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={`http://localhost:3001/uploads/${photo.filename}`}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>

          <button
            onClick={() => onDelete(photo)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Deletar foto"
          >
            ×
          </button>

          {photo.dominantColor && (
            <div
              className="absolute bottom-2 left-2 w-6 h-6 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: photo.dominantColor }}
              title={`Cor predominante: ${photo.dominantColor}`}
            />
          )}

          <p className="mt-2 text-sm text-gray-700 truncate">{photo.title}</p>
        </div>
      ))}
    </div>
  );
};
