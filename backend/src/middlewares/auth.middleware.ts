import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthPayload } from "../types";

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    const headerValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ erro: "Formato de token inválido" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ erro: "Token mal formatado" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};
