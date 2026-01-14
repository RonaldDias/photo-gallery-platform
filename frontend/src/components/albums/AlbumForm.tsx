import { useForm } from "react-hook-form";
import {
  albumSchema,
  type Album,
  type AlbumFormData,
} from "../../types/album.types";
import { zodResolver } from "@hookform/resolvers/zod";

interface AlbumFormProps {
  album?: Album;
  onSubmit: (data: AlbumFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const AlbumForm = ({
  album,
  onSubmit,
  onCancel,
  isSubmitting,
}: AlbumFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: album
      ? {
          title: album.title,
          description: album.description || "",
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Título *
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descrição
        </label>
        <textarea
          id="description"
          rows={3}
          {...register("description")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : album ? "Salvar" : "Criar"}
        </button>
      </div>
    </form>
  );
};
