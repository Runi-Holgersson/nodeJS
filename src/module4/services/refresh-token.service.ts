import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {logger} from "../utils/logger";
import {REFRESH_TOKEN_EXPIRE_TIMEOUT, REFRESH_TOKEN_KEY, TOKEN_EXPIRE_TIMEOUT, TOKEN_KEY} from "../configs";

export async function refreshToken( req: Request, res: Response) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const postData = req.body;
        if (!postData.user) {
            res.status(400).send("All input is required");
        }
        if (postData.refreshToken) {
            const user = postData.user;
            const token = jwt.sign({ user }, TOKEN_KEY, { expiresIn: TOKEN_EXPIRE_TIMEOUT });
            const refreshToken = jwt.sign({ user }, REFRESH_TOKEN_KEY, { expiresIn: REFRESH_TOKEN_EXPIRE_TIMEOUT });
            res.status(201).json({token, refreshToken});
        } else {
            res.status(403).json("message: Forbidden Error");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}