
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt";
import { findUserByEmail } from "../data/index";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Contraseña incorrecta" });

        const token = generateToken({ id: user.id });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};