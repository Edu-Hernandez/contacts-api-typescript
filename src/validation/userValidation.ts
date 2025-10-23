import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    createdAt: Joi.date().default(new Date()),
    updatedAt: Joi.date().default(new Date()),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(50),
    phone: Joi.string().min(10).max(15),
    isActive: Joi.boolean(),
    updatedAt: Joi.date().default(new Date()),
}).min(1);
