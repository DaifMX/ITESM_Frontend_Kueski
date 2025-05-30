import Joi from "joi";

const validationSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s+[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
        .messages({
            'any.required': 'Se requiere un nombre.',
            'string.pattern.base': 'Nombre invalido. Verifque espacios dobles o signos invalidos. [Áá-Zz]',
        }),

    lastName: Joi.string()
        .required()
        .pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s+[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
        .messages({
            'any.required': 'Se requiere un apellido.',
            'string.pattern.base': 'Nombre invalido. Verifque espacios dobles o signos invalidos. [Áá-Zz]',
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(18)
        .messages({
            'any.required': 'Se requiere una contraseña.',
            'string.max': 'La contraseña debe de ser máximo de 18 dígitos',
            'string.min': 'La contraseña debe de ser minimo de 6 dígitos',
        }),

    phoneNumber: Joi.string()
        .required()
        .pattern(/^\d{10}$/)
        .messages({
            'any.required': 'Se requiere un número telefónico.',
            'string.pattern.base': 'El número telefónico contener solo dígitos y máximo 10.',
            'string.empty': 'El campo no puede estar vacío.',
        }),
});

export default validationSchema;