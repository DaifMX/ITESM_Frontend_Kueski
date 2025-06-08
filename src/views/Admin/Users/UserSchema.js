import Joi from 'joi';

export default class UserFormSchema {
    isUpdate;
    tailor;

    schema = Joi.object({
        firstName: Joi.string()
            .alter({
                save: (s) => s.required(),
                update: (s) => s.optional()
            })
            .min(2)
            .max(30)
            .messages({
                'any.required': 'El nombre es obligatorio.',
                'string.empty': 'El nombre no puede estar vacío.',
                'string.min': 'Debe tener al menos 2 caracteres.',
                'string.max': 'Debe tener como máximo 30 caracteres.'
            }),

        lastName: Joi.string()
            .alter({
                save: (s) => s.required(),
                update: (s) => s.optional()
            })
            .min(2)
            .max(30)
            .messages({
                'any.required': 'El apellido es obligatorio.',
                'string.empty': 'El apellido no puede estar vacío.',
                'string.min': 'Debe tener al menos 2 caracteres.',
                'string.max': 'Debe tener como máximo 30 caracteres.'
            }),
        phoneNumber: Joi.string()
            .alter({
                save: (props) => props.required(),
                update: (props) => props.optional(),
            })
            .max(10)
            .min(10)
            .pattern(/^\d{10}$/)
            .messages({
                'any.required': 'Se requiere un número teléfonico.',
                'string.max': 'El número telefónico debe de ser de 10 dígitos',
                'string.min': 'El número telefónico debe de ser de 10 dígitos',
                'string.pattern.base': 'El número debe tener exactamente 10 dígitos.',
                'string.empty': 'El campo no puede estar vacío.',
            }),
        password: Joi.string()
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .min(6)
            .max(18)
            .messages({
                'any.required': 'Se requiere una contraseña.',
                'string.max': 'La contraseña debe de ser máximo de 18 dígitos',
                'string.min': 'La contraseña debe de ser minimo de 6 dígitos',
            }),
        role: Joi.string()
            .valid('ADMIN', 'USER')
            .alter({
                save: (s) => s.required(),
                update: (s) => s.optional()
            })
            .messages({
                'any.required': 'El rol es obligatorio.',
                'any.only': 'Debe ser Admin o Usuario.',
                'string.empty': 'El rol no puede estar vacío.'
            })
    });

    constructor(isUpdate = false) {
        this.tailor = isUpdate ? 'update' : 'save';
    }

    getSchema = () => this.schema.tailor(this.tailor);

    validateSchema = (entry) => {
        const { error, value } = this.getSchema().validate(entry);
        if (error) {
            console.error('Validation error', error.message);
            throw new Error(error.message.replaceAll('"', ''));
        }
        return value;
    }
}
