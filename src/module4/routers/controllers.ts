import express from 'express';
import { validateUser  } from "../services/validation.service";
import User, { UserMap } from '../models/user';
import Group, { GroupMap } from "../models/group";
import database from '../models/db';
import { Request, Response } from "express";

export const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    try {
        UserMap(database);
        const result = await User.findAll();
        res.status(200).json({ users: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        UserMap(database);
        const id = Number(req.params.id);
        const result = await User.findByPk(id);
        res.status(200).json({ user: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.post('/users', validateUser, async (req: Request, res: Response) => {
   try {
       let newUser = req.body;
       UserMap(database);
       const result = await User.create(newUser);
       newUser = result.dataValues as User;
       res.status(201).json({ user: newUser });
   } catch(err) {
       res.status(500).json({ message: err });
   }
});

router.get('/groups', async (req: Request, res: Response) => {
    try {
        GroupMap(database);
        const result = await Group.findAll();
        res.status(200).json({ groups: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
})



