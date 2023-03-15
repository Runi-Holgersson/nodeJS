import {Request, Response} from "express";
import {logger} from "../utils/logger";
import User from "../models/user.model";

export async function getUsers( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const result = await User.findAll();
        res.status(200).json({ users: result });
    } catch(err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
}