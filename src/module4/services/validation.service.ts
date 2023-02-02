import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const schema = Joi.object(
    {
        id: Joi.string().required(),
        login: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
        age: Joi.number().min(4).max(130).required(),
        isdeleted: Joi.boolean().required()
    }
)

export async function validateUser(req: Request, res: Response, next: NextFunction) {
    const result = await schema.validate(req.body);
        if (!result.error){
            next();
        } else {
            res.status(400).json({ message: result.error.message });
        }
}

module.exports = {
    validateUser,
};