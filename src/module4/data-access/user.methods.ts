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

export async function getUser( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const id = Number(req.params.id);
        const result = await User.findByPk(id);
        res.status(200).json({ user: result });
    } catch(err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
}

export async function createUser( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        let newUser = req.body;
        const result = await User.create(newUser);
        newUser = result.dataValues as User;
        logger.info({ message: `created user ${newUser}`});
        res.status(201).json({ user: newUser });
    } catch(err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
}

export async function updateUser( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        let newUser = req.body;
        const id = Number(req.params.id);
        const user = await User.findByPk(id);
        if(!user){
            res.status(404).json({ message: `No users with id ${id} exist`});
        } else {
            const result = await user.update(newUser);
            newUser = result.dataValues as User;
            res.status(201).json({ user: newUser });
        }
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`)
        res.status(500).json({ message: err });
    }
}

export async function deleteUser( req: Request, res: Response ){
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const id = Number(req.params.id);
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({message: `No users with id ${id} exist`});
        } else {
            await user.destroy();
            res.status(200).json({user: `User with id ${id} has been deleted`});
        }
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
}

