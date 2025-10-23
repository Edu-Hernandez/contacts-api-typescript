import { RequestHandler } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Datos de validación incorrectos",
        details: error.details[0].message,
      });
    }

    next();
  };
};
