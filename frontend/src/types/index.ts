export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    photos: number;
  };
}

export interface Photo {
  id: string;
  title: string;
  description?: string;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  acquisitionDate: string;
  dominantColor: string;
  albumId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
