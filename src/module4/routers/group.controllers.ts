import express from 'express';
import { validateUser  } from "../services/validation.service";
import GroupModel, { GroupMap } from "../models/group.model";
import database from '../models/db';
import { Request, Response } from "express";
import UserModel, {UserMap} from "../models/user.model";
import UserGroupModel, {UserGroupMap} from "../models/user-group.model";
import {usersRouter} from "./user.controllers";

export const groupsRouter = express.Router();

groupsRouter.get('/groups', async (req: Request, res: Response) => {
    try {
        GroupMap(database);
        const result = await GroupModel.findAll({
        });
        res.status(200).json({ groups: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

groupsRouter.get('/groups/:id', async (req: Request, res: Response) => {
    try {
        GroupMap(database);
        const id = Number(req.params.id);
        const result = await GroupModel.findByPk(id);
        res.status(200).json({ group: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

groupsRouter.post('/groups', async (req: Request, res: Response) => {
   try {
       let newGroup = req.body;
       GroupMap(database);
       const result = await GroupModel.create(newGroup);
       newGroup = result.dataValues as GroupModel;
       res.status(201).json({ group: newGroup });
   } catch(err) {
       res.status(500).json({ message: err });
   }
});

groupsRouter.put('/groups/:id', async (req: Request, res:Response) => {
    try {
        let newGroup = req.body;
        const id = Number(req.params.id);
        GroupMap(database);
        const group = await GroupModel.findByPk(id);
        if(!group){
            res.status(404).json({ message: `No groups with id ${id} exist`});
        } else {
            const result = await group.update(newGroup);
            newGroup = result.dataValues as GroupModel;
            res.status(201).json({ group: newGroup });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

groupsRouter.delete('/groups/:id', async (req: Request, res:Response) =>{
    try {
        const id = Number(req.params.id);
        GroupMap(database);
        const group = await GroupModel.findByPk(id);
        if (!group) {
            res.status(404).json({message: `No groups with id ${id} exist`});
        } else {
            await group.destroy();
            res.status(200).json({group: `Group with ${id} has been deleted`});
        }
    } catch (err) {
    res.status(500).json({ message: err });
}
})

groupsRouter.post('/usergroups/:id', async (req: Request, res: Response) => {
    try {
        let newGroup = req.body;
        const id = Number(req.params.id);
        GroupMap(database);
        UserMap(database);
        const user = await UserModel.findByPk(id);
        const result = await GroupModel.create({newGroup, UserMap: user},
            {
                include: UserModel
            });
        newGroup = result.dataValues as GroupModel;
        res.status(201).json({ group: newGroup });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});



