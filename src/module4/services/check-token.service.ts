import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers['x-access-token'];
        console.log(token);
        if (token && typeof token === "string") {
            jwt.verify(token, "secret", (err, decoded) => {
                if (err) {
                    res.status(403).json(err);
                } else {
                    next();
                }
            })
        }
    } catch (err) {
        res.status(401).json(err);
    }
}