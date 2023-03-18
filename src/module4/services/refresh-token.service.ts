import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {logger} from "../utils/logger";

export async function refreshToken( req: Request, res: Response) {
    try {
        logger.log('info', 'refresh-token service been called', {service: "refresh-token-service"});
        const postData = req.body;
        if (!postData.user) {
            res.status(400).send("All input is required");
        }
        if (postData.refreshToken) {
            const user = postData.user;
            // @ts-ignore
            const token = jwt.sign({ user }, process.env["TOKEN_KEY"], { expiresIn: process.env["TOKEN_EXPIRE_TIMEOUT"] });
            // @ts-ignore
            const refreshToken = jwt.sign({ user }, process.env["REFRESH_TOKEN_KEY"], { expiresIn: process.env["REFRESH_TOKEN_EXPIRE_TIMEOUT"] });
            res.status(201).json({token, refreshToken});
        } else {
            res.status(403).json("message: Forbidden Error");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}