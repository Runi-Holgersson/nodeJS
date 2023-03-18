import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {logger} from "../utils/logger";
import User from "../models/user.model";

export async function loginUser( req: Request, res: Response) {
    try {
        logger.log('info', 'login-user service been called', {service: "login-user-service"});
        const { login, password } = req.body;
        if (!(login && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne( {
            where: { login: login },
        } );
        if (user && user.password) {
            if ( password.toString() === user.password.toString() ) {
                // @ts-ignore
                const token = jwt.sign({ user }, process.env["TOKEN_KEY"], { expiresIn: process.env["TOKEN_EXPIRE_TIMEOUT"] });
                // @ts-ignore
                const refreshToken = jwt.sign({ user }, process.env["REFRESH_TOKEN_KEY"], { expiresIn: process.env["REFRESH_TOKEN_EXPIRE_TIMEOUT"] });
                res.status(201).json({token, refreshToken});
            } else {
                res.status(403).json("message: Forbidden Error");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}