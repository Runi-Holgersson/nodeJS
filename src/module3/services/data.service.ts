import {NextFunction, Request, Response} from "express";

export async function mapCamelCaseToSnakeCase (req: Request, res: Response, next: NextFunction) {
    Object.keys(req.body).forEach(function (key): void {
        if (!!(key.match(/[A-Z]/g))) {
            req.body[key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = req.body[key];
            delete req.body[key];
        }
    });
    req.body = JSON.stringify(req.body);
    //console.log(req.body);
    next();
}

export async function mapSnakeCaseToCamelCase (req: Request, res: Response, next: NextFunction) {
    Object.keys(req.body).map((key) => key.replace(/([_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('_', '');
    }));
    console.log(req.body);
    next();
}

module.exports = {
    mapCamelCaseToSnakeCase,
    mapSnakeCaseToCamelCase
};