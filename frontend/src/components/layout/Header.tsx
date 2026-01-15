import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/albuns")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">📸</span>
              <h1 className="text-xl font-bold text-gray-900">Photo Gallery</h1>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate("/albuns")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Meus Álbuns
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.name || "Usuário"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
