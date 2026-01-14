import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Photo Gallery Platform
            </h1>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
