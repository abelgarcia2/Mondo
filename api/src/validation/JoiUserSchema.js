import Joi from "joi";

export const JoiUserSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string().pattern(new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"))
        .required(),

    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
        .required(),
    
    created_places: Joi.array().items(Joi.object())
})

/*
^	The password string will start this way
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
*/