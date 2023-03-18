import express from 'express';
import { Request, Response } from "express";
import Group from "../models/group.model";
import {logger} from "../utils/logger";
import {createGroup, deleteGroup, getGroup, getGroups, updateGroup} from "../data-access/group.methods";

export const groupsRouter = express.Router();

groupsRouter.get('/groups', getGroups);

groupsRouter.get('/groups/:id', getGroup);

groupsRouter.post('/groups', createGroup);

groupsRouter.put('/groups/:id', updateGroup);

groupsRouter.delete('/groups/:id', deleteGroup)
