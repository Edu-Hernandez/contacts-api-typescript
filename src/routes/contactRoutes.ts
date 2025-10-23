import { Router } from "express";
import { validate } from "../middleware/validation";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../controllers/contactController";
import {
  contactSchema,
  updateContactSchema,
} from "../validation/contactValidation";

const router = Router();

//GET /contacts
router.get("/", getAllContacts);

//GET /contacts/:id -Obtener contacto por id
router.get("/:id", getContactById);

//POST /contacts - Crear un nuevo contacto
router.post("/", validate(contactSchema), createContact);

//PUT /contacts/:id - Actualizar un contacto
router.put("/:id", validate(updateContactSchema), updateContact);

//DELETE /contacts/:id - Eliminar un contacto
router.delete("/:id", deleteContact);

export default router;
