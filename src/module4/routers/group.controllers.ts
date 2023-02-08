import express from 'express';
import { Request, Response } from "express";
import Group from "../models/group.model";
import User from "../models/user.model";
import UserGroup from "../models/user-group.model";

export const groupsRouter = express.Router();
groupsRouter.get('/groups', async (req: Request, res: Response) => {
    try {
        const result = await Group.findAll({
        });
        res.status(200).json({ groups: result });
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
});
groupsRouter.get('/groups/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await Group.findByPk(id);
        res.status(200).json({ group: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});
groupsRouter.post('/groups', async (req: Request, res: Response) => {
    try {
        let newGroup = req.body;
        const result = await Group.create(newGroup);
        newGroup = result.dataValues as Group;
        res.status(201).json({ group: newGroup });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});
groupsRouter.put('/groups/:id', async (req: Request, res:Response) => {
    try {
        let newGroup = req.body;
        const id = Number(req.params.id);
        const group = await Group.findByPk(id);
        if(!group){
            res.status(404).json({ message: `No groups with id ${id} exist`});
        } else {
            const result = await group.update(newGroup);
            newGroup = result.dataValues as Group;
            res.status(201).json({ group: newGroup });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
groupsRouter.delete('/groups/:id', async (req: Request, res:Response) =>{
    try {
        const id = Number(req.params.id);
        const group = await Group.findByPk(id);
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
groupsRouter.post('/usergroups/:userid', async (req: Request, res: Response) => {
    try {
        const newGroup = req.body;
        const id = Number(req.params.userid);
        User.belongsToMany(Group, { through: UserGroup, onDelete: "cascade" });
        Group.belongsToMany(User, { through: UserGroup, onDelete: "cascade" });
        const user = await User.findByPk(id);
        const group = await Group.create(newGroup);
        // @ts-ignore
        await group.addUser(user);
        const result = await Group.findByPk(newGroup.id, {include: User})
        res.status(201).json({ group: result });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});