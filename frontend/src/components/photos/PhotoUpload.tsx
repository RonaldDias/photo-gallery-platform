import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface PhotoUploadProps {
  albumId: string;
  onUploadSuccess: () => void;
}

export const PhotoUpload = ({ albumId, onUploadSuccess }: PhotoUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setError("");

      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map(({ file, errors }) => {
          if (errors[0]?.code === "file-too-large") {
            return `${file.name}: tamanho máximo é 10MB`;
          }
          if (errors[0]?.code === "file-invalid-type") {
            return `${file.name}: tipo de arquivo não permitido`;
          }
          return `${file.name}: erro desconhecido`;
        });
        setError(errors.join(", "));
        return;
      }

      setSelectedFiles(acceptedFiles);

      const previewUrls = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(previewUrls);
    },
  });

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("fotos", file);
      });

      const response = await fetch(
        `http://localhost:3001/api/albuns/${albumId}/fotos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer upload");
      }

      setSuccess(`${selectedFiles.length} foto(s) enviada(s) com sucesso!`);
      setSelectedFiles([]);
      setPreviews([]);
      onUploadSuccess();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erro ao fazer upload das fotos");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl">📸</div>
          {isDragActive ? (
            <p className="text-blue-600 font-medium">
              Solte as imagens aqui...
            </p>
          ) : (
            <>
              <p className="text-gray-700 font-medium">
                Arraste e solte imagens aqui
              </p>
              <p className="text-gray-500 text-sm">ou clique para selecionar</p>
              <p className="text-gray-400 text-xs">
                PNG, JPG, GIF, WEBP (máx. 10MB cada)
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {previews.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">
            {selectedFiles.length} imagem(ns) selecionada(s)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {selectedFiles[index].name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isUploading ? "Enviando..." : "Enviar Fotos"}
          </button>
        </div>
      )}
    </div>
  );
};
