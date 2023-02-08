import express from 'express';
import { validateUser  } from "../services/validation.service";
import User from '../models/user.model';
import Group from "../models/group.model";
import { Request, Response } from "express";
import {addUsersToGroup} from "../data-access/methods";
export const usersRouter = express.Router();

usersRouter.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await User.findAll();
        res.status(200).json({ users: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});
usersRouter.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await User.findByPk(id);
        res.status(200).json({ user: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});
usersRouter.post('/users', validateUser, async (req: Request, res: Response) => {
    try {
        let newUser = req.body;
        const result = await User.create(newUser);
        newUser = result.dataValues as User;
        res.status(201).json({ user: newUser });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});
usersRouter.put('/users/:id', validateUser, async (req: Request, res:Response) => {
    try {
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
        res.status(500).json({ message: err });
    }
})
usersRouter.delete('/users/:id', async (req: Request, res:Response) =>{
    try {
        const id = Number(req.params.id);
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({message: `No groups with id ${id} exist`});
        } else {
            await user.destroy();
            res.status(200).json({group: `Group with ${id} has been deleted`});
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

usersRouter.post('/usersgroup/:groupid', async (req: Request, res: Response) => {
    try {
        const userIds: any[] = req.body;
        const groupId = Number(req.params.groupid);
        const result = await addUsersToGroup(groupId, userIds);
        res.status(201).json({ group: result });
    } catch (err) {
        res.status(500).json({ message: err });
    }
})