import { Router } from "express";
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../../controllers/contactController";
import { contactSchema, updateContactSchema } from "../../validation/contactValidation";
import { validate } from "../../middleware/validation";

const contactsRouter = Router();

//GET /contacts
contactsRouter.get("/", getAllContacts);

//GET /contacts/:id -Obtener contacto por id
contactsRouter.get("/:id", getContactById);

//POST /contacts - Crear un nuevo contacto
contactsRouter.post("/", validate(contactSchema), createContact);

//PUT /contacts/:id - Actualizar un contacto
contactsRouter.put("/:id", validate(updateContactSchema), updateContact);

//DELETE /contacts/:id - Eliminar un contacto
contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
