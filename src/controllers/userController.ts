import { Request, Response } from "express";
import { User } from "../types/users";
import { users } from "../data";


export const getAllUsers = (req: Request, res: Response) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

export const getUserById = (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = users.findIndex((u) => u.id === id);
        if (user === -1) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(users[user]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}

export const createUser = (req: Request, res: Response) => {
    try {
        const newUser: User = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            isActive: req.body.isActive,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        users.push(newUser);
        res.status(201).json({message: "Usuario creado correctamente", user: newUser});
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

export const updateUser = (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        users[userIndex] = {
            ...users[userIndex],
            ...req.body,
            updatedAt: new Date(),
        };
        res.status(200).json(users[userIndex]);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

export const deleteUser = (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        users.splice(userIndex, 1);
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}