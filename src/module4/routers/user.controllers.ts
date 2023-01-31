import express from 'express';
import { validateUser  } from "../services/validation.service";
import UserModel, { UserMap } from '../models/user.model';
import GroupModel, { GroupMap } from "../models/group.model";
import database from '../models/db';
import { Request, Response } from "express";

export const usersRouter = express.Router();

usersRouter.get('/users', async (req: Request, res: Response) => {
    try {
        UserMap(database);
        const result = await UserModel.findAll();
        res.status(200).json({ users: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

usersRouter.get('/users/:id', async (req: Request, res: Response) => {
    try {
        UserMap(database);
        const id = Number(req.params.id);
        const result = await UserModel.findByPk(id);
        res.status(200).json({ user: result });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

usersRouter.post('/users', validateUser, async (req: Request, res: Response) => {
   try {
       let newUser = req.body;
       UserMap(database);
       const result = await UserModel.create(newUser);
       newUser = result.dataValues as UserModel;
       res.status(201).json({ user: newUser });
   } catch(err) {
       res.status(500).json({ message: err });
   }
});


