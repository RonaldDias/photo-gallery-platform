import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { AlbumsListPage } from "./pages/albums/AlbumsListPage";
import { AlbumDetailPage } from "./pages/albums/AlbumDetailPage";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />

          <Route
            path="/albuns"
            element={
              <ProtectedRoute>
                <Layout>
                  <AlbumsListPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/albuns/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AlbumDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
