import { Request, Response } from "express";
import { datos } from "../data/index";
import type { Contact } from "../types/contact";

export const getAllContacts = (req: Request, res: Response) => {
  try {
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los contactos" });
  }
};

export const getContactById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = datos.find((c) => c.id === id);

    if (!contact) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el contacto" });
  }
};

export const createContact = (req: Request, res: Response) => {
  try {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    datos.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el contacto" });
  }
};

export const updateContact = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactIndex = datos.findIndex((c) => c.id === id);

    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    datos[contactIndex] = {
      ...datos[contactIndex],
      ...req.body,
      updatedAt: new Date(),
    };
    res.status(200).json(datos[contactIndex]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el contacto" });
  }
};

export const deleteContact = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactIndex = datos.findIndex((c) => c.id === id);

    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    datos.splice(contactIndex, 1);
    res.status(200).json({ message: "Contacto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el contacto" });
  }
};
