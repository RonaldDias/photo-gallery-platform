import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { AlbumsListPage } from "./pages/albums/AlbumsListPage";
import { AlbumDetailPage } from "./pages/albums/AlbumDetailPage";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
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
    </ErrorBoundary>
  );
}

export default App;
