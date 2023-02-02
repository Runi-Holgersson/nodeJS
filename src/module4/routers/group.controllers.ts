import express from 'express';
import { validateUser  } from "../services/validation.service";
import GroupModel, { GroupMap } from "../models/group.model";
import database from '../models/db';
import { Request, Response } from "express";
import UserModel, {UserMap} from "../models/user.model";
import UserGroupModel, {UserGroupMap} from "../models/user-group.model";

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



