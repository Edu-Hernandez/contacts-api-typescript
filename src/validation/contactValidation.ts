import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(new Date()),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]+$/),
  address: Joi.string(),
  updatedAt: Joi.date().default(new Date()),
}).min(1);
