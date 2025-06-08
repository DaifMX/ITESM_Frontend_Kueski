import Joi from 'joi';

export default class ProductFormSchema {
    isUpdate;
    tailor;

    schema = Joi.object({
        name: Joi.string()
            .alter({
                save: (s) => s.required(),
                update: (s) => s.optional()
            })
            .min(6)
            .max(50)
            .messages({
                'any.required': 'El nombre es obligatorio.',
                'string.empty': 'El nombre no puede estar vacío.',
                'string.min': 'Debe tener al menos 6 caracteres.',
                'string.max': 'Debe tener como máximo 50 caracteres.'
            }),
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
