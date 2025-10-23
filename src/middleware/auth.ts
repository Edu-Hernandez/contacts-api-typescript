import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    req.user = decoded;
    next();
}