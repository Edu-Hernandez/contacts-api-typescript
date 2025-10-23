import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../controllers/userController";
import { updateUserSchema, userSchema } from "../../validation/userValidation";
import { validate } from "../../middleware/validation";

const userRouter = Router();

//GET /users
userRouter.get("/", getAllUsers);

//GET /users/:id - Obtener un usuario por id
userRouter.get("/:id", getUserById);

//POST /users - Crear un nuevo usuario
userRouter.post("/", validate(userSchema), createUser);

//PUT /users/:id - Actualizar un usuario
userRouter.put("/:id", validate(updateUserSchema), updateUser);

//DELETE /users/:id - Eliminar un usuario
userRouter.delete("/:id", deleteUser);

export default userRouter;