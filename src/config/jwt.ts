import { JWT_SECRET } from ".";
import jwt from "jsonwebtoken";

export const generateToken = (payload: object, expiresIn: string = '1h') => {
    const secret = JWT_SECRET || "default-secret";
    return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
}

export const verifyToken = (token: string) => {
    try {
        const secret = JWT_SECRET || "default-secret";
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}