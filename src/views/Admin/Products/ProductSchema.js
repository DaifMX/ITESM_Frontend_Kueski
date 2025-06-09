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
            .required()
            .min(6)
            .max(50)
            .messages({
                'any.required': 'Obligatorio.',
                'string.empty': 'El nombre no puede estar vacío.',
                'string.min': 'Debe tener al menos 6 caracteres.',
                'string.max': 'Debe tener como máximo 50 caracteres.'
            }),
        stock: Joi.number()
            .alter({
                save: (s) => s.required(),
                update: (s) => s.optional(),
            })
            .required()
            .min(0)
            .max(1000000)
            .messages({
                'any.required': 'Obligatorio.',
                'string.empty': 'El stock no puede estar vacío.',
                'number.min': 'El stock tiene que ser mayor a 0',
                'number.max': 'El stock debe ser menor a un millon.',
            }),
        price: Joi.number()
            .alter({
                save: (s) => s.required(),
                update: (s) => s.optional(),
            })
            .required()
            .min(0)
            .max(1000000)
            .messages({
                'any.required': 'Obligatorio.',
                'string.empty': 'El precio no puede estar vacío.',
                'number.min': 'El precio tiene que ser mayor a 0',
                'number.max': 'El precio debe ser menor a un millon.',
            }),
        description: Joi.string()
            .required()
            .min(6)
            .max(80)
            .messages({
                'any.required': 'Obligatorio.',
                'string.empty': 'No puede estar vacío.',
                'string.min': 'Al menos 6 caracteres.',
                'string.max': 'Máxmio 80 caracteres.',
            }),
        category: Joi.string()
            .valid(
                'cargadores',
                'escapes',
                'filtros',
                'frenos',
                'interiores',
                'exteriores',
                'rines',
                'suspension'
            )
            .required()
            .messages({
                'any.required': 'Obligatorio.',
                'string.valid': 'Categoría invalida.',
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
    };
}
