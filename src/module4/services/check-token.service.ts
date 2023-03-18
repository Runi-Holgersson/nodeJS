import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {logger} from "../utils/logger";
import dotenv from 'dotenv';
dotenv.config();

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.originalUrl === "/login" || req.originalUrl === "/token") {
            next();
        } else {
            logger.log('info', 'check-token service been called', {service: "check-token-service"});
            let token = req.headers['x-access-token'];
            if (token && typeof token === "string") {
                // @ts-ignore
                jwt.verify(token, process.env["TOKEN_KEY"], (err, decoded) => {
                    if (err) {
                        res.status(403).json(err);
                    } else {
                        next();
                    }
                })
            } else {
                throw new Error("invalid token");
            }
        }
    } catch (err) {
        res.status(401).json(err);
    }
}