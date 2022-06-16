import Joi from "joi";

export const JoiPlaceSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(50)
        .required(),

    subtitle: Joi.string()
        .min(3)
        .max(50).
        required(),

    description: Joi.string()
        .max(255),

    labels: Joi.array()
        .items(Joi.string().max(20))
        .min(3).max(10).required(),

    location: Joi.object({
        lat: Joi.number().min(-85.05112878).max(85.05112878).required(),
        lng: Joi.number().min(-180).max(180).required()
    }).required(),

    images: Joi.array().items(Joi.string()).max(10)
})