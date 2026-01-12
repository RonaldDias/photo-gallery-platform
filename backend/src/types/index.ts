export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  title: string;
  description?: string;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  acquisitionDate: Date;
  dominantColor: string;
  albumId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
