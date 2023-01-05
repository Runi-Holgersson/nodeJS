import {NextFunction, Request, Response} from "express";

function findUser(req: Request, res: Response, next: NextFunction) {

next();
}

module.exports = findUser;