import express from 'express';
import { validateUser  } from "../services/validation.service";
import User from '../models/user.model';
import Group from "../models/group.model";
import { Request, Response } from "express";
import { addUsersToGroup } from "../data-access/methods";
import { logger } from "../utils/logger";
import { checkToken } from "../services/check-token.service";
import { loginUser } from "../services/login.service";
export const usersRouter = express.Router();

usersRouter.get('/users', checkToken, async (req: Request, res: Response) => {
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
});
usersRouter.get('/users/:id', checkToken, async (req: Request, res: Response) => {
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
});
usersRouter.post('/users', validateUser, async (req: Request, res: Response) => {
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
});
usersRouter.put('/users/:id', checkToken, validateUser, async (req: Request, res:Response) => {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        let newUser = req.body;
        const id = Number(req.params.id);
        const user = await Group.findByPk(id);
        if(!user){
            res.status(404).json({ message: `No users with id ${id} exist`});
        } else {
            const result = await user.update(newUser);
            newUser = result.dataValues as Group;
            res.status(201).json({ group: newUser });
        }
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`)
        res.status(500).json({ message: err });
    }
})
usersRouter.delete('/users/:id', checkToken, async (req: Request, res:Response) =>{
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const id = Number(req.params.id);
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({message: `No groups with id ${id} exist`});
        } else {
            await user.destroy();
            res.status(200).json({group: `Group with ${id} has been deleted`});
        }
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
})

usersRouter.post('/usersgroup/:groupid', checkToken, async (req: Request, res: Response) => {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const userIds: any[] = req.body;
        const groupId = Number(req.params.groupid);
        const result = await addUsersToGroup(groupId, userIds);
        res.status(201).json({ group: result });
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
})

usersRouter.post('/login', loginUser);