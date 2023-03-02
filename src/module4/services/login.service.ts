import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {logger} from "../utils/logger";
import User from "../models/user.model";
import {REFRESH_TOKEN_EXPIRE_TIMEOUT, REFRESH_TOKEN_KEY, TOKEN_EXPIRE_TIMEOUT, TOKEN_KEY} from "../configs";

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
                const token = jwt.sign({ user }, TOKEN_KEY, { expiresIn: TOKEN_EXPIRE_TIMEOUT });
                const refreshToken = jwt.sign({ user }, REFRESH_TOKEN_KEY, { expiresIn: REFRESH_TOKEN_EXPIRE_TIMEOUT });
                res.status(201).json({token, refreshToken});
            } else {
                res.status(403).json("message: Forbidden Error");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}